import { expect, jest, test } from "@jest/globals";
import dispatchMessageCommand from "../../src/commands/dispatch-message-command.mjs";

test("propagates help reply failures", async () => {
  const context = { log: { debug: jest.fn() }, msg: jest.fn(() => "help response") };
  const error = new Error("reply failed");
  const message = {
    content: "!help",
    guild: { preferredLocale: "fr" },
    reply: jest.fn().mockRejectedValue(error),
  };

  await expect(dispatchMessageCommand(context, message)).rejects.toBe(error);

  expect(context.msg).toHaveBeenCalledWith("fr", "help", "This is the help text.");
  expect(message.reply).toHaveBeenCalledWith("help response");
});
