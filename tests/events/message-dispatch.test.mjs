import { expect, jest, test } from "@jest/globals";
import dispatchGuildMessage from "../../src/events/message-dispatch.mjs";

test("does not dispatch messages from the bot", async () => {
  const context = {
    client: { user: { id: "bot" } },
    log: { debug: jest.fn() },
    msg: jest.fn(),
  };
  const message = {
    content: "!help",
    author: { id: "bot" },
    guild: {},
    reply: jest.fn(),
  };

  await dispatchGuildMessage(context, message);

  expect(context.msg).not.toHaveBeenCalled();
  expect(message.reply).not.toHaveBeenCalled();
});
