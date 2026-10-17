import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/guildScheduledEventDelete.mjs";

test("logs the guildScheduledEventDelete event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "guildScheduledEvent" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("guildScheduledEventDelete", {
    guildScheduledEvent: eventValue1,
  });
});
