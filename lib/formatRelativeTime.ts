/**
 * Restituisce una rappresentazione leggibile
 * del tempo trascorso dalla data specificata.
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();

  const diffMs = Math.max(0, now.getTime() - date.getTime());

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (diffMs < minute) {
    return "Pochi istanti fa";
  }

  if (diffMs < hour) {
    const minutes = Math.floor(diffMs / minute);

    return `${minutes} ${minutes === 1 ? "minuto" : "minuti"} fa`;
  }

  if (diffMs < day) {
    const hours = Math.floor(diffMs / hour);

    return `${hours} ${hours === 1 ? "ora" : "ore"} fa`;
  }

  const days = Math.floor(diffMs / day);

  if (days === 1) {
    return "Ieri";
  }

  if (days < 7) {
    return `${days} giorni fa`;
  }

  const weeks = Math.floor(days / 7);

  if (weeks < 5) {
    return `${weeks} ${weeks === 1 ? "settimana" : "settimane"} fa`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${months} ${months === 1 ? "mese" : "mesi"} fa`;
  }

  const years = Math.floor(days / 365);

  return `${years} ${years === 1 ? "anno" : "anni"} fa`;
}