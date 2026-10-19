import { expect, jest, test } from "@jest/globals";
import messageHelp from "../../../src/commands/message/help.mjs";

test("logs the help response", async () => {
  const log = { debug: jest.fn() };
  const msg = jest.fn(() => "help response");
  const message = { guild: { preferredLocale: "fr" }, reply: jest.fn() };

  await messageHelp({ log, msg }, message);

  expect(message.reply).toHaveBeenCalledWith("help response");
  expect(log.debug).toHaveBeenCalledWith("!help Response", { response: "help response" });
});

test("propagates reply failures", async () => {
  const context = { log: { debug: jest.fn() }, msg: jest.fn(() => "help response") };
  const error = new Error("reply failed");
  const message = {
    guild: { preferredLocale: "fr" },
    reply: jest.fn().mockRejectedValue(error),
  };

  await expect(messageHelp(context, message)).rejects.toBe(error);

  expect(context.msg).toHaveBeenCalledWith("fr", "help", "This is the help text.");
});
