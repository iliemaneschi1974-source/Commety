export interface PushNotificationPreferences {
  municipalUpdates: boolean;
  statusChanges: boolean;
  messages: boolean;
  verificationRequests: boolean;
  nearbyReports: boolean;
}

export interface PushNotificationState {
  preferences: PushNotificationPreferences;
  deviceEnabled: boolean;
}

export const DEFAULT_PUSH_NOTIFICATION_PREFERENCES: PushNotificationPreferences = {
  municipalUpdates: true,
  statusChanges: true,
  messages: true,
  verificationRequests: true,
  nearbyReports: false,
};
