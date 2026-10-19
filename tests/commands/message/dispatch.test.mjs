import { expect, jest, test } from "@jest/globals";
import dispatchMessage from "../../../src/commands/message/dispatch.mjs";

test("does not dispatch differently cased help commands", async () => {
  const context = { log: { debug: jest.fn() }, msg: jest.fn() };
  const message = { content: "!HELP", reply: jest.fn() };

  await dispatchMessage(context, message);

  expect(context.msg).not.toHaveBeenCalled();
  expect(message.reply).not.toHaveBeenCalled();
});
