const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  (typeof window !== "undefined"
    ? window.location.origin
    : "https://commety.it");

export function buildShareUrl(reportId: string) {
  return `${BASE_URL}/r/${reportId}`;
}

interface ShareDataParams {
  reportId: string;
  title: string;
  address?: string;
  city?: string;
}

export function buildShareData({
  reportId,
  title,
  address,
  city,
}: ShareDataParams) {
  const url = buildShareUrl(reportId);

  const location = [address, city]
    .filter(Boolean)
    .join(", ");

  const text = location
    ? `📍 ${location}\n\nGuarda questa segnalazione su Commety:\n${url}`
    : `Guarda questa segnalazione su Commety:\n${url}`;

  return {
    title,
    text,
    url,
  };
}