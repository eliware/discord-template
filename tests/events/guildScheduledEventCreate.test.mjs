import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/guildScheduledEventCreate.mjs";

test("logs the guildScheduledEventCreate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "guildScheduledEvent" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("guildScheduledEventCreate", {
    guildScheduledEvent: eventValue1,
  });
});
