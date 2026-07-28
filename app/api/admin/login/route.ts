import { NextRequest, NextResponse } from "next/server";

import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_DURATION_SECONDS,
  createAdminSessionToken,
  verifyAdminCredentials,
} from "@/lib/admin/session";

const MAX_ATTEMPTS = 5;
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
const attempts = new Map<
  string,
  { count: number; resetAt: number }
>();

function getClientKey(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  return !origin || origin === request.nextUrl.origin;
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json(
      { error: "Richiesta non valida." },
      { status: 403 }
    );
  }

  const key = getClientKey(request);
  const now = Date.now();
  const current = attempts.get(key);
  if (
    current &&
    current.resetAt > now &&
    current.count >= MAX_ATTEMPTS
  ) {
    return NextResponse.json(
      {
        error:
          "Troppi tentativi. Riprova tra quindici minuti.",
      },
      { status: 429 }
    );
  }

  let body: { email?: unknown; password?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json(
      { error: "Dati di accesso non validi." },
      { status: 400 }
    );
  }

  const email =
    typeof body.email === "string" ? body.email : "";
  const password =
    typeof body.password === "string" ? body.password : "";
  if (
    !email ||
    email.length > 254 ||
    password.length < 12 ||
    password.length > 128
  ) {
    return NextResponse.json(
      { error: "Email o password non corretti." },
      { status: 401 }
    );
  }

  const verification = verifyAdminCredentials(
    email,
    password
  );
  if (verification === "not-configured") {
    return NextResponse.json(
      {
        error:
          "Accesso demo non ancora configurato. Imposta le credenziali amministrative.",
      },
      { status: 503 }
    );
  }

  if (verification !== "valid") {
    attempts.set(key, {
      count:
        current && current.resetAt > now
          ? current.count + 1
          : 1,
      resetAt:
        current && current.resetAt > now
          ? current.resetAt
          : now + ATTEMPT_WINDOW_MS,
    });
    return NextResponse.json(
      { error: "Email o password non corretti." },
      { status: 401 }
    );
  }

  attempts.delete(key);
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: createAdminSessionToken(email.trim().toLowerCase()),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: ADMIN_SESSION_DURATION_SECONDS,
  });
  return response;
}
