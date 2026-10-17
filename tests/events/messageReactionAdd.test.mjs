import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/messageReactionAdd.mjs";

test("logs the messageReactionAdd event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "reaction" };
  const eventValue2 = { marker: "user" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("messageReactionAdd", {
    reaction: eventValue1,
    user: eventValue2,
  });
});
