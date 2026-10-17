import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/messageReactionRemove.mjs";

test("logs the messageReactionRemove event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "reaction" };
  const eventValue2 = { marker: "user" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("messageReactionRemove", {
    reaction: eventValue1,
    user: eventValue2,
  });
});
