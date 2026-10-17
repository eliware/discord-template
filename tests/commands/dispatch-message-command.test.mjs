import { expect, jest, test } from "@jest/globals";
import dispatchMessageCommand from "../../src/commands/dispatch-message-command.mjs";

test("dispatches the help command", async () => {
  const context = { log: { debug: jest.fn() }, msg: jest.fn(() => "help response") };
  const message = { content: "!help", guild: { preferredLocale: "fr" }, reply: jest.fn() };

  await dispatchMessageCommand(context, message);

  expect(context.msg).toHaveBeenCalledWith("fr", "help", "This is the help text.");
  expect(message.reply).toHaveBeenCalledWith("help response");
});
