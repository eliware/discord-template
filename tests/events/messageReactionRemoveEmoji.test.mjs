import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/messageReactionRemoveEmoji.mjs";

test("logs the messageReactionRemoveEmoji event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "reaction" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("messageReactionRemoveEmoji", { reaction: eventValue1 });
});
