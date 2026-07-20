import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import {
  DefaultModerationEngine,
  DefaultModerationPolicy,
  UserContent,
} from "@commety/core";

import { adminDb } from "../config/firebaseAdmin";

const MAX_MESSAGE_LENGTH = 500;
const MAX_MESSAGES_PER_MINUTE = 10;

const CHAT_BLOCKING_EVIDENCES = new Set([
  "HATE_SPEECH",
  "BESTEMMIE",
  "PAROLACCE",
  "SPAM",
  "CARATTERI_RIPETUTI",
  "PAROLE_RIPETUTE",
  "EMOJI_RIPETUTE",
  "MAIUSCOLO_ECCESSIVO",
  "LINK_MULTIPLI",
  "EMAIL_MULTIPLE",
  "NUMERI_TELEFONICI_MULTIPLI",
  "PATTERN_PUBBLICITARIO",
  "PAROLE_CHIAVE_SPAM",
  "PUBBLICITA",
  "DATI_PERSONALI_RILEVATI",
  "PHISHING",
]);

type ChatAction =
  | "inbox"
  | "open"
  | "messages"
  | "send"
  | "respond"
  | "reportAndBlock"
  | "delete";

type ChatRequest = {
  action?: ChatAction;
  recipientId?: string;
  threadId?: string;
  text?: string;
  response?: "accept" | "reject";
};

type UserData = {
  status?: string;
  profile?: {
    displayName?: string;
    username?: string;
    avatarUrl?: string;
  };
};

function requireString(value: unknown, field: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new HttpsError("invalid-argument", `${field} non valido.`);
  }

  return value.trim();
}

function threadIdFor(firstUserId: string, secondUserId: string): string {
  return [firstUserId, secondUserId].sort().join("_");
}

function toIso(value: unknown): string | undefined {
  return value instanceof Timestamp
    ? value.toDate().toISOString()
    : undefined;
}

function participant(uid: string, user: UserData) {
  return {
    uid,
    displayName:
      user.profile?.displayName ||
      user.profile?.username ||
      "Utente Commety",
    avatarUrl: user.profile?.avatarUrl || undefined,
  };
}

async function getActiveUser(uid: string): Promise<UserData> {
  const snapshot = await adminDb.collection("users").doc(uid).get();
  const user = snapshot.data() as UserData | undefined;

  if (!snapshot.exists || !user || user.status !== "ACTIVE") {
    throw new HttpsError(
      "permission-denied",
      "Questo utente non può usare la chat."
    );
  }

  return user;
}

function toThread(
  id: string,
  data: FirebaseFirestore.DocumentData,
  currentUserId: string
) {
  const participants = Array.isArray(data.participants)
    ? data.participants
    : [];
  const otherParticipant = participants.find(
    (entry: { uid?: string }) => entry.uid !== currentUserId
  );

  return {
    id,
    participant: otherParticipant ?? {
      uid: "",
      displayName: "Utente Commety",
    },
    lastMessage:
      typeof data.lastMessage === "string"
        ? data.lastMessage
        : undefined,
    lastMessageAt: toIso(data.lastMessageAt),
    status: data.status === "ACCEPTED" || data.status === "REJECTED"
      ? data.status
      : "REQUESTED",
    requestedBy: String(data.requestedBy ?? ""),
  };
}

async function isBlocked(
  firstUserId: string,
  secondUserId: string
): Promise<boolean> {
  const [firstBlock, secondBlock] = await Promise.all([
    adminDb
      .collection("users")
      .doc(firstUserId)
      .collection("blockedUsers")
      .doc(secondUserId)
      .get(),
    adminDb
      .collection("users")
      .doc(secondUserId)
      .collection("blockedUsers")
      .doc(firstUserId)
      .get(),
  ]);

  return firstBlock.exists || secondBlock.exists;
}

async function requireMember(
  threadId: string,
  userId: string
) {
  const threadRef = adminDb.collection("chatThreads").doc(threadId);
  const snapshot = await threadRef.get();
  const members = snapshot.data()?.members;

  if (
    !snapshot.exists ||
    !Array.isArray(members) ||
    !members.includes(userId)
  ) {
    throw new HttpsError(
      "permission-denied",
      "Non puoi accedere a questa conversazione."
    );
  }

  return threadRef;
}

export const chat = onCall(
  { region: "europe-west1" },
  async (request) => {
    const userId = request.auth?.uid;

    if (!userId) {
      throw new HttpsError(
        "unauthenticated",
        "Accedi per usare i messaggi privati."
      );
    }

    await getActiveUser(userId);
    const data = (request.data ?? {}) as ChatRequest;

    if (data.action === "inbox") {
      const snapshot = await adminDb
        .collection("chatThreads")
        .where("members", "array-contains", userId)
        .get();

      const threads = snapshot.docs
        .map((document) => toThread(document.id, document.data(), userId))
        .sort((first, second) =>
          (second.lastMessageAt ?? "").localeCompare(
            first.lastMessageAt ?? ""
          )
        );

      return { threads };
    }

    if (data.action === "open") {
      const recipientId = requireString(data.recipientId, "Destinatario");

      if (recipientId === userId) {
        throw new HttpsError(
          "invalid-argument",
          "Non puoi aprire una chat con te stesso."
        );
      }

      const [sender, recipient] = await Promise.all([
        getActiveUser(userId),
        getActiveUser(recipientId),
      ]);

      if (await isBlocked(userId, recipientId)) {
        throw new HttpsError(
          "permission-denied",
          "Non puoi inviare una richiesta a questo utente."
        );
      }
      const threadId = threadIdFor(userId, recipientId);
      const threadRef = adminDb.collection("chatThreads").doc(threadId);

      let thread = await threadRef.get();

      if (!thread.exists) {
        await threadRef.set({
          members: [userId, recipientId],
          participants: [
            participant(userId, sender),
            participant(recipientId, recipient),
          ],
          status: "REQUESTED",
          requestedBy: userId,
          requestedAt: FieldValue.serverTimestamp(),
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        });
        thread = await threadRef.get();
      }

      return { thread: toThread(thread.id, thread.data() ?? {}, userId) };
    }

    const threadId = requireString(data.threadId, "Conversazione");
    const threadRef = await requireMember(threadId, userId);

    if (data.action === "respond") {
      const thread = await threadRef.get();
      const requestedBy = String(thread.data()?.requestedBy ?? "");
      const status = thread.data()?.status;

      if (status !== "REQUESTED" || requestedBy === userId) {
        throw new HttpsError(
          "permission-denied",
          "Non puoi rispondere a questa richiesta."
        );
      }

      if (data.response !== "accept" && data.response !== "reject") {
        throw new HttpsError("invalid-argument", "Risposta non valida.");
      }

      if (data.response === "accept") {
        const participants = Array.isArray(thread.data()?.participants)
          ? thread.data()?.participants
          : [];
        const requester = participants.find(
          (entry: { uid?: string }) => entry.uid === requestedBy
        ) as { displayName?: string } | undefined;
        const requesterName = requester?.displayName || "un utente Commety";
        const welcomeMessage =
          `Ciao, è un piacere parlare con te. Io sono ${requesterName}.`;

        await Promise.all([
          threadRef.collection("messages").add({
            text: welcomeMessage,
            senderId: requestedBy,
            createdAt: FieldValue.serverTimestamp(),
            automatic: true,
          }),
          threadRef.update({
            status: "ACCEPTED",
            respondedAt: FieldValue.serverTimestamp(),
            lastMessage: welcomeMessage,
            lastMessageAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
          }),
        ]);
      } else {
        await threadRef.update({
          status: "REJECTED",
          respondedAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        });
      }

      return { accepted: data.response === "accept" };
    }

    if (data.action === "reportAndBlock") {
      const thread = await threadRef.get();
      const otherUserId = (thread.data()?.members as unknown[] ?? [])
        .find((member) => member !== userId);

      if (typeof otherUserId !== "string") {
        throw new HttpsError("not-found", "Utente non trovato.");
      }

      await Promise.all([
        adminDb
          .collection("users")
          .doc(userId)
          .collection("blockedUsers")
          .doc(otherUserId)
          .set({
            ownerId: userId,
            blockedUserId: otherUserId,
            threadId,
            createdAt: FieldValue.serverTimestamp(),
          }),
        adminDb.collection("chatReports").add({
          reporterId: userId,
          reportedUserId: otherUserId,
          threadId,
          createdAt: FieldValue.serverTimestamp(),
        }),
        threadRef.update({
          status: "REJECTED",
          updatedAt: FieldValue.serverTimestamp(),
        }),
      ]);

      return { blocked: true };
    }

    if (data.action === "delete") {
      await adminDb.recursiveDelete(threadRef);

      return { deleted: true };
    }

    if (data.action === "messages") {
      const snapshot = await threadRef
        .collection("messages")
        .orderBy("createdAt", "desc")
        .limit(100)
        .get();

      const messages = snapshot.docs
        .map((document) => ({
          id: document.id,
          text: String(document.data().text ?? ""),
          senderId: String(document.data().senderId ?? ""),
          createdAt: toIso(document.data().createdAt),
        }))
        .reverse();

      return { messages };
    }

    if (data.action !== "send") {
      throw new HttpsError("invalid-argument", "Azione chat non valida.");
    }

    const status = (await threadRef.get()).data()?.status;

    if (status !== "ACCEPTED") {
      throw new HttpsError(
        "permission-denied",
        "I messaggi sono disponibili solo dopo l'accettazione della richiesta."
      );
    }

    const text = requireString(data.text, "Messaggio");

    if (text.length > MAX_MESSAGE_LENGTH) {
      throw new HttpsError(
        "invalid-argument",
        `Un messaggio può contenere al massimo ${MAX_MESSAGE_LENGTH} caratteri.`
      );
    }

    const recentMessages = await threadRef
      .collection("messages")
      .orderBy("createdAt", "desc")
      .limit(30)
      .get();
    const oneMinuteAgo = Date.now() - 60_000;
    const recentOwnMessages = recentMessages.docs.filter((document) => {
      const message = document.data();
      return (
        message.senderId === userId &&
        message.createdAt instanceof Timestamp &&
        message.createdAt.toMillis() >= oneMinuteAgo
      );
    });

    if (recentOwnMessages.length >= MAX_MESSAGES_PER_MINUTE) {
      throw new HttpsError(
        "resource-exhausted",
        "Stai inviando messaggi troppo velocemente. Riprova tra poco."
      );
    }

    const moderation = new DefaultModerationEngine(
      new DefaultModerationPolicy()
    ).modera(new UserContent(text, []));

    const hasBlockingEvidence = moderation.evidences.some(
      (evidence) => CHAT_BLOCKING_EVIDENCES.has(evidence.tipo)
    );

    if (hasBlockingEvidence) {
      return {
        sent: false,
        error: "Il messaggio non rispetta le regole della community.",
      };
    }

    await Promise.all([
      threadRef.collection("messages").add({
        text,
        senderId: userId,
        createdAt: FieldValue.serverTimestamp(),
      }),
      threadRef.update({
        lastMessage: text,
        lastMessageAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      }),
    ]);

    return { sent: true };
  }
);
