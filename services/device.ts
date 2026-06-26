const STORAGE_KEY = "commety-device-id";

/**
 * Restituisce un identificatore permanente del dispositivo.
 * Se non esiste, ne genera uno e lo salva nel localStorage.
 */
export function getDeviceId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  const existingId = localStorage.getItem(STORAGE_KEY);

  if (existingId) {
    return existingId;
  }

  const deviceId = crypto.randomUUID();

  localStorage.setItem(STORAGE_KEY, deviceId);

  return deviceId;
}