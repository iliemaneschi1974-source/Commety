import { describe, expect, it } from "vitest";

import {
  preferenceFor,
  shouldSendPush,
} from "../functions/src/domain/pushNotificationPolicy";

describe("push notification policy", () => {
  it("invia il cambio stato anche con gli aggiornamenti comunali disattivati", () => {
    const notification = {
      type: "MUNICIPAL_UPDATE",
      eventKind: "STATUS",
    };
    const preferences = {
      municipalUpdates: false,
      statusChanges: true,
    };

    expect(preferenceFor(notification)).toBe("statusChanges");
    expect(shouldSendPush(notification, preferences)).toBe(true);
  });

  it("non invia una semplice nota se gli aggiornamenti comunali sono disattivati", () => {
    expect(shouldSendPush(
      { type: "MUNICIPAL_UPDATE", eventKind: "NOTE" },
      { municipalUpdates: false, statusChanges: true }
    )).toBe(false);
  });

  it("invia un cambio stato con nota se almeno una preferenza è attiva", () => {
    const notification = {
      type: "MUNICIPAL_UPDATE",
      eventKind: "STATUS_AND_NOTE",
    };

    expect(shouldSendPush(notification, {
      municipalUpdates: false,
      statusChanges: true,
    })).toBe(true);
    expect(shouldSendPush(notification, {
      municipalUpdates: true,
      statusChanges: false,
    })).toBe(true);
    expect(shouldSendPush(notification, {
      municipalUpdates: false,
      statusChanges: false,
    })).toBe(false);
  });
});
