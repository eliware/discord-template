import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/emojiCreate.mjs";

test("logs the emojiCreate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "emoji" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("emojiCreate", { emoji: eventValue1 });
});
