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
const DEVICE_ENABLED_KEY = "commety-push-device-enabled";

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

async function getBrowserPushToken(): Promise<string | undefined> {
  if (Notification.permission !== "granted") return undefined;

  const registration = await navigator.serviceWorker.register(
    "/firebase-messaging-sw.js",
    { scope: "/", updateViaCache: "none" }
  );
  const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
  const token = await getToken(getMessaging(firebaseApp), {
    serviceWorkerRegistration: registration,
    ...(vapidKey ? { vapidKey } : {}),
  });
  return token || undefined;
}

export async function getPushNotificationState(): Promise<PushNotificationState> {
  const supported = await isSupported().catch(() => false);
  if (!supported) {
    return {
      preferences: DEFAULT_PUSH_NOTIFICATION_PREFERENCES,
      deviceEnabled: false,
    };
  }

  const token = await getBrowserPushToken().catch(() => undefined);
  let state = await callPushSettings<PushNotificationState>("state", {
    deviceId: getDeviceId(),
    ...(token ? { token } : {}),
  });
  const storedIntent = window.localStorage.getItem(DEVICE_ENABLED_KEY);

  if (
    !state.deviceEnabled &&
    storedIntent === "true" &&
    token &&
    Notification.permission === "granted"
  ) {
    state = await callPushSettings<PushNotificationState>("enable", {
      deviceId: getDeviceId(),
      token,
    });
  }

  if (state.deviceEnabled) {
    window.localStorage.setItem(DEVICE_ENABLED_KEY, "true");
  }

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

  const token = await getBrowserPushToken();

  if (!token) throw new Error("PUSH_TOKEN_UNAVAILABLE");

  const state = await callPushSettings<PushNotificationState>("enable", {
    deviceId: getDeviceId(),
    token,
  });
  window.localStorage.setItem(DEVICE_ENABLED_KEY, "true");
  return state;
}

export async function disablePushNotifications(): Promise<PushNotificationState> {
  const state = await callPushSettings<PushNotificationState>("disable", {
    deviceId: getDeviceId(),
  });
  if (await isSupported().catch(() => false)) {
    await deleteToken(getMessaging(firebaseApp)).catch(() => false);
  }
  window.localStorage.setItem(DEVICE_ENABLED_KEY, "false");
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
