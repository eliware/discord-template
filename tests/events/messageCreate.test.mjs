import { jest, expect, test } from "@jest/globals";
import handler from "../../src/events/messageCreate.mjs";

function context() {
  return {
    client: { user: { id: "bot-id" } },
    log: { debug: jest.fn() },
    msg: jest.fn(() => "help response"),
  };
}

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

test("does not dispatch direct messages", async () => {
  const app = context();
  const message = {
    id: "m4",
    author: { id: "user" },
    content: "!help",
    reply: jest.fn(),
  };
  await handler(app, message);
  expect(app.msg).not.toHaveBeenCalled();
});
