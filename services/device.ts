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

/**
 * Crea un identificatore non reversibile e valido solo per una singola
 * segnalazione. Serve a riconoscere l'autore anonimo senza salvare o
 * pubblicare il suo ID dispositivo.
 */
export async function getReportOwnerKey(
  reportId: string
): Promise<string> {
  const data = new TextEncoder().encode(
    `${getDeviceId()}:${reportId}`
  );

  const digest = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}
