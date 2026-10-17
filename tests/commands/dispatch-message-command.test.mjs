import { expect, jest, test } from "@jest/globals";
import dispatchMessageCommand from "../../src/commands/dispatch-message-command.mjs";

test("ignores messages without a command match", async () => {
  const context = { log: { debug: jest.fn() }, msg: jest.fn() };
  const message = { content: "hello", guild: {}, reply: jest.fn() };

  await dispatchMessageCommand(context, message);

  expect(context.msg).not.toHaveBeenCalled();
  expect(message.reply).not.toHaveBeenCalled();
});
