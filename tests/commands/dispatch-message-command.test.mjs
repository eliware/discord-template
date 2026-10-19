import { expect, jest, test } from "@jest/globals";
import dispatchMessageCommand from "../../src/commands/dispatch-message-command.mjs";

test("dispatches help messages", async () => {
  const context = { log: { debug: jest.fn() }, msg: jest.fn(() => "help response") };
  const message = { content: "!help", guild: { preferredLocale: "fr" }, reply: jest.fn() };

  await dispatchMessageCommand(context, message);

  expect(context.msg).toHaveBeenCalledWith("fr", "help", "This is the help text.");
  expect(message.reply).toHaveBeenCalledWith("help response");
});

test("ignores messages without a supported command", async () => {
  const context = { log: { debug: jest.fn() }, msg: jest.fn() };
  const message = { content: "!unknown", reply: jest.fn() };

  await dispatchMessageCommand(context, message);

  expect(context.msg).not.toHaveBeenCalled();
  expect(message.reply).not.toHaveBeenCalled();
});
