import { httpsCallable } from "firebase/functions";

import { functions } from "@/lib/firebase";
import type { NotificationInbox } from "@/types/notification";

type NotificationResponse = NotificationInbox & {
  success?: boolean;
};

async function callNotifications(
  action: "inbox" | "markRead" | "markAllRead",
  payload: Record<string, unknown> = {}
): Promise<NotificationResponse> {
  const callable = httpsCallable<
    { action: string } & Record<string, unknown>,
    NotificationResponse
  >(functions, "notifications");
  const result = await callable({ action, ...payload });
  return result.data;
}

export async function getNotificationInbox(): Promise<NotificationInbox> {
  const result = await callNotifications("inbox");
  return {
    notifications: result.notifications ?? [],
    unreadCount: result.unreadCount ?? 0,
  };
}

export async function markNotificationRead(
  notificationId: string
): Promise<void> {
  await callNotifications("markRead", { notificationId });
}

export async function markAllNotificationsRead(): Promise<void> {
  await callNotifications("markAllRead");
}
