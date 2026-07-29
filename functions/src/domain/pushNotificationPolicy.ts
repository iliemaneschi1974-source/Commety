export type PushPreference =
  | "municipalUpdates"
  | "statusChanges"
  | "messages"
  | "verificationRequests"
  | "nearbyReports";

export type PushPreferences = Partial<Record<PushPreference, boolean>>;

type NotificationData = {
  type?: unknown;
  eventKind?: unknown;
};

export function preferenceFor(data: NotificationData): PushPreference {
  if (data.type === "CHAT_MESSAGE" || data.type === "CHAT_REQUEST") {
    return "messages";
  }
  if (data.type === "VERIFICATION_REQUEST") return "verificationRequests";
  if (data.type === "NEARBY_REPORT") return "nearbyReports";
  return "municipalUpdates";
}

export function shouldSendPush(
  data: NotificationData,
  configured: PushPreferences | undefined
): boolean {
  const preference = preferenceFor(data);

  if (preference === "nearbyReports") {
    return configured?.nearbyReports === true;
  }

  return configured?.[preference] !== false;
}
