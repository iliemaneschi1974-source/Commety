"use client";

import {
  deleteToken,
  getMessaging,
  getToken,
  isSupported,
} from "firebase/messaging";
import { httpsCallable } from "firebase/functions";

import { firebaseApp, functions } from "@/lib/firebase";
import {
  DEFAULT_PUSH_NOTIFICATION_PREFERENCES,
  type PushNotificationPreferences,
  type PushNotificationState,
} from "@/types/push-notifications";

const DEVICE_ID_KEY = "commety-push-device-id";

function getDeviceId(): string {
  const current = window.localStorage.getItem(DEVICE_ID_KEY);
  if (current) return current;
  const next = crypto.randomUUID();
  window.localStorage.setItem(DEVICE_ID_KEY, next);
  return next;
}

async function callPushSettings<T>(
  action: string,
  payload: Record<string, unknown> = {}
): Promise<T> {
  const callable = httpsCallable<
    { action: string } & Record<string, unknown>,
    T
  >(functions, "pushSettings");
  const result = await callable({ action, ...payload });
  return result.data;
}

export async function getPushNotificationState(): Promise<PushNotificationState> {
  const supported = await isSupported().catch(() => false);
  if (!supported) {
    return {
      preferences: DEFAULT_PUSH_NOTIFICATION_PREFERENCES,
      deviceEnabled: false,
    };
  }

  const state = await callPushSettings<PushNotificationState>("state", {
    deviceId: getDeviceId(),
  });
  return {
    ...state,
    deviceEnabled:
      state.deviceEnabled && Notification.permission === "granted",
  };
}

export async function enablePushNotifications(): Promise<PushNotificationState> {
  if (!(await isSupported())) {
    throw new Error("PUSH_UNSUPPORTED");
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("PUSH_PERMISSION_DENIED");
  }

  const registration = await navigator.serviceWorker.register(
    "/firebase-messaging-sw.js",
    { scope: "/", updateViaCache: "none" }
  );
  const messaging = getMessaging(firebaseApp);
  const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
  const token = await getToken(messaging, {
    serviceWorkerRegistration: registration,
    ...(vapidKey ? { vapidKey } : {}),
  });

  if (!token) throw new Error("PUSH_TOKEN_UNAVAILABLE");

  return callPushSettings<PushNotificationState>("enable", {
    deviceId: getDeviceId(),
    token,
  });
}

export async function disablePushNotifications(): Promise<PushNotificationState> {
  const state = await callPushSettings<PushNotificationState>("disable", {
    deviceId: getDeviceId(),
  });
  if (await isSupported().catch(() => false)) {
    await deleteToken(getMessaging(firebaseApp)).catch(() => false);
  }
  return state;
}

export async function updatePushNotificationPreferences(
  preferences: PushNotificationPreferences
): Promise<PushNotificationState> {
  return callPushSettings<PushNotificationState>("preferences", {
    deviceId: getDeviceId(),
    preferences,
  });
}
