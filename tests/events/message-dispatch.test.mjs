import { expect, jest, test } from "@jest/globals";
import dispatchGuildMessage from "../../src/events/message-dispatch.mjs";

test("dispatches eligible guild messages", async () => {
  const context = {
    client: { user: { id: "bot" } },
    log: { debug: jest.fn() },
    msg: jest.fn(() => "help response"),
  };
  const message = {
    content: "!help",
    author: { id: "user" },
    guild: { preferredLocale: "fr" },
    reply: jest.fn(),
  };

  await dispatchGuildMessage(context, message);

  expect(context.msg).toHaveBeenCalledWith("fr", "help", "This is the help text.");
  expect(message.reply).toHaveBeenCalledWith("help response");
});

test("does not dispatch direct messages", async () => {
  const context = {
    client: { user: { id: "bot" } },
    log: { debug: jest.fn() },
    msg: jest.fn(),
  };
  const message = { content: "!help", author: { id: "user" }, reply: jest.fn() };

  await dispatchGuildMessage(context, message);

  expect(context.msg).not.toHaveBeenCalled();
  expect(message.reply).not.toHaveBeenCalled();
});
