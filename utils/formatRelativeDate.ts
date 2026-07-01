export function formatRelativeDate(date: Date) {
  const now = new Date();

  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const commentDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const time = date.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (commentDay.getTime() === today.getTime()) {
    return `Oggi • ${time}`;
  }

  if (commentDay.getTime() === yesterday.getTime()) {
    return `Ieri • ${time}`;
  }

  return (
    date.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "short",
    }) +
    " • " +
    time
  );
}