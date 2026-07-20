import { httpsCallable } from "firebase/functions";

import { functions } from "@/lib/firebase";
import {
  ChatMessage,
  ChatThread,
} from "@/types/chat";

type ChatResponse = {
  threads?: ChatThread[];
  thread?: ChatThread;
  messages?: ChatMessage[];
  sent?: boolean;
  error?: string;
};

async function callChat(
  action: string,
  payload: Record<string, string> = {}
): Promise<ChatResponse> {
  const chat = httpsCallable<
    { action: string } & Record<string, string>,
    ChatResponse
  >(functions, "chat");

  const result = await chat({ action, ...payload });

  return result.data;
}

export async function getChatInbox(): Promise<ChatThread[]> {
  const result = await callChat("inbox");
  return result.threads ?? [];
}

export async function openChat(
  recipientId: string
): Promise<ChatThread> {
  const result = await callChat("open", { recipientId });

  if (!result.thread) {
    throw new Error("Non è stato possibile aprire la conversazione.");
  }

  return result.thread;
}

export async function getChatMessages(
  threadId: string
): Promise<ChatMessage[]> {
  const result = await callChat("messages", { threadId });
  return result.messages ?? [];
}

export async function sendChatMessage(
  threadId: string,
  text: string
): Promise<ChatResponse> {
  return callChat("send", { threadId, text });
}

export async function respondToChatRequest(
  threadId: string,
  response: "accept" | "reject"
): Promise<ChatResponse> {
  return callChat("respond", { threadId, response });
}

export async function reportAndBlockChatUser(
  threadId: string
): Promise<ChatResponse> {
  return callChat("reportAndBlock", { threadId });
}

export async function deleteChatThread(
  threadId: string
): Promise<ChatResponse> {
  return callChat("delete", { threadId });
}
