self.addEventListener("push", (event) => {
  if (!event.data) return;

  let payload;
  try {
    payload = event.data.json();
  } catch {
    return;
  }

  const data = payload.data || payload.notification || payload;
  const title = data.title || "Commety";
  const options = {
    body: data.body || "Hai un nuovo aggiornamento su Commety.",
    icon: data.icon || "/commety-marker.png",
    badge: data.badge || "/commety-marker.png",
    tag: data.tag || undefined,
    renotify: false,
    data: {
      url: data.url || "/chat",
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = new URL(
    event.notification.data?.url || "/chat",
    self.location.origin
  ).href;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(
      (windowClients) => {
        const existing = windowClients.find(
          (client) => new URL(client.url).origin === self.location.origin
        );
        if (existing) {
          existing.navigate(targetUrl);
          return existing.focus();
        }
        return clients.openWindow(targetUrl);
      }
    )
  );
});
