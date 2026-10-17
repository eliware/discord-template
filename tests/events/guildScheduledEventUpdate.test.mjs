import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/guildScheduledEventUpdate.mjs";

test("logs the guildScheduledEventUpdate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "oldGuildScheduledEvent" };
  const eventValue2 = { marker: "newGuildScheduledEvent" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("guildScheduledEventUpdate", {
    oldGuildScheduledEvent: eventValue1,
    newGuildScheduledEvent: eventValue2,
  });
});
