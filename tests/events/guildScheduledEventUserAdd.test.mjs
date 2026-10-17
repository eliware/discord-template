import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/guildScheduledEventUserAdd.mjs";

test("logs the guildScheduledEventUserAdd event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "guildScheduledEvent" };
  const eventValue2 = { marker: "user" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("guildScheduledEventUserAdd", {
    guildScheduledEvent: eventValue1,
    user: eventValue2,
  });
});
