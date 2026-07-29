import { describe, expect, it } from "vitest";

import {
  preferenceFor,
  shouldSendPush,
} from "../functions/src/domain/pushNotificationPolicy";

describe("push notification policy", () => {
  it("raggruppa i cambi di stato negli aggiornamenti comunali", () => {
    const notification = {
      type: "MUNICIPAL_UPDATE",
      eventKind: "STATUS",
    };
    const preferences = {
      municipalUpdates: true,
      statusChanges: true,
    };

    expect(preferenceFor(notification)).toBe("municipalUpdates");
    expect(shouldSendPush(notification, preferences)).toBe(true);
  });

  it("disattiva insieme note e cambi di stato", () => {
    const preferences = {
      municipalUpdates: false,
      statusChanges: true,
    };

    expect(shouldSendPush(
      { type: "MUNICIPAL_UPDATE", eventKind: "NOTE" },
      preferences
    )).toBe(false);
    expect(shouldSendPush(
      { type: "MUNICIPAL_UPDATE", eventKind: "STATUS" },
      preferences
    )).toBe(false);
    expect(shouldSendPush(
      { type: "MUNICIPAL_UPDATE", eventKind: "STATUS_AND_NOTE" },
      preferences
    )).toBe(false);
  });
});
