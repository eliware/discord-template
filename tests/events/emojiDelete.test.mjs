import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/emojiDelete.mjs";

test("logs the emojiDelete event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "emoji" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("emojiDelete", { emoji: eventValue1 });
});
