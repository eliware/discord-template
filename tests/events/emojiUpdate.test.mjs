import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/emojiUpdate.mjs";

test("logs the emojiUpdate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "oldEmoji" };
  const eventValue2 = { marker: "newEmoji" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("emojiUpdate", {
    oldEmoji: eventValue1,
    newEmoji: eventValue2,
  });
});
