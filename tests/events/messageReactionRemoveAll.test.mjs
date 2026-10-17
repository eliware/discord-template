import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/messageReactionRemoveAll.mjs";

test("logs the messageReactionRemoveAll event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "message" };
  const eventValue2 = { marker: "reactions" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("messageReactionRemoveAll", {
    message: eventValue1,
    reactions: eventValue2,
  });
});
