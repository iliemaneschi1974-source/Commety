import "server-only";

import {
  createHmac,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";

import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "commety_admin_session";
export const ADMIN_SESSION_DURATION_SECONDS = 8 * 60 * 60;

export interface AdminSession {
  email: string;
  municipalityId: "roma";
  municipalityName: "Roma";
  expiresAt: number;
}

function getSessionSecret(): string | null {
  const secret =
    process.env.COMMETY_ADMIN_SESSION_SECRET?.trim();
  return secret && secret.length >= 32 ? secret : null;
}

function encode(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");
}

export function createAdminSessionToken(
  email: string
): string {
  const secret = getSessionSecret();
  if (!secret) {
    throw new Error(
      "COMMETY_ADMIN_SESSION_SECRET non configurata."
    );
  }

  const session: AdminSession = {
    email,
    municipalityId: "roma",
    municipalityName: "Roma",
    expiresAt:
      Date.now() + ADMIN_SESSION_DURATION_SECONDS * 1000,
  };
  const payload = encode(JSON.stringify(session));
  return `${payload}.${sign(payload, secret)}`;
}

export function verifyAdminSessionToken(
  token: string | undefined
): AdminSession | null {
  const secret = getSessionSecret();
  if (!secret || !token) return null;

  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return null;

  const expected = Buffer.from(sign(payload, secret));
  const received = Buffer.from(signature);
  if (
    expected.length !== received.length ||
    !timingSafeEqual(expected, received)
  ) {
    return null;
  }

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as AdminSession;
    if (
      session.municipalityId !== "roma" ||
      session.expiresAt <= Date.now() ||
      typeof session.email !== "string"
    ) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(
    cookieStore.get(ADMIN_COOKIE_NAME)?.value
  );
}

export function verifyAdminCredentials(
  email: string,
  password: string
): "valid" | "invalid" | "not-configured" {
  const expectedEmail =
    process.env.COMMETY_ADMIN_EMAIL?.trim().toLowerCase();
  const passwordSalt =
    process.env.COMMETY_ADMIN_PASSWORD_SALT?.trim();
  const passwordHash =
    process.env.COMMETY_ADMIN_PASSWORD_HASH?.trim();

  if (!expectedEmail || !passwordSalt || !passwordHash) {
    return "not-configured";
  }

  const emailMatches =
    email.trim().toLowerCase() === expectedEmail;
  const candidateHash = scryptSync(
    password,
    passwordSalt,
    64
  );
  const expectedHash = Buffer.from(passwordHash, "hex");
  const passwordMatches =
    candidateHash.length === expectedHash.length &&
    timingSafeEqual(candidateHash, expectedHash);

  return emailMatches && passwordMatches
    ? "valid"
    : "invalid";
}
