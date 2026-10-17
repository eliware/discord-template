import { jest, expect, test } from "@jest/globals";
import handler from "../../src/events/messageCreate.mjs";

function context() {
  return {
    client: { user: { id: "bot-id" } },
    log: { debug: jest.fn() },
    msg: jest.fn(() => "help response"),
  };
}

test("ignores messages authored by the bot", async () => {
  const app = context();
  await handler(app, {
    id: "m1",
    author: { id: "bot-id" },
    content: "!help",
    guild: {},
  });
  expect(app.msg).not.toHaveBeenCalled();
});

test("ignores messages before the client is ready", async () => {
  const app = context();
  app.client.user = null;
  await expect(
    handler(app, { id: "m0", author: { id: "user" }, content: "!help", guild: {} }),
  ).resolves.toBeUndefined();
  expect(app.msg).not.toHaveBeenCalled();
});

test("replies to help in the guild locale", async () => {
  const app = context();
  const message = {
    id: "m2",
    author: { id: "user" },
    content: "!help",
    guild: { preferredLocale: "fr" },
    reply: jest.fn(),
  };
  await handler(app, message);
  expect(app.msg).toHaveBeenCalledWith("fr", "help", "This is the help text.");
  expect(message.reply).toHaveBeenCalledWith("help response");
});

test("uses the default locale for help messages", async () => {
  const app = context();
  const message = {
    id: "m3",
    author: { id: "user" },
    content: "!help",
    guild: {},
    reply: jest.fn(),
  };
  await handler(app, message);
  expect(app.msg).toHaveBeenCalledWith("en-US", "help", "This is the help text.");
  expect(message.reply).toHaveBeenCalledWith("help response");
});

test("ignores other user messages", async () => {
  const app = context();
  const message = {
    id: "m3",
    author: { id: "user" },
    content: "hello",
    guild: {},
    reply: jest.fn(),
  };
  await handler(app, message);
  expect(app.msg).not.toHaveBeenCalled();
  expect(message.reply).not.toHaveBeenCalled();
});

test("ignores direct messages", async () => {
  const app = context();
  const message = {
    id: "m4",
    author: { id: "user" },
    content: "!help",
    guild: null,
    reply: jest.fn(),
  };
  await handler(app, message);
  expect(message.reply).not.toHaveBeenCalled();
  expect(app.msg).not.toHaveBeenCalled();
});
