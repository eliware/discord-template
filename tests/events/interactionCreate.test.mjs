import { jest, expect, test } from "@jest/globals";
import handler from "../../src/events/interactionCreate.mjs";

test("dispatches a localized slash command to its app handler", async () => {
  const log = {};
  const msg = jest.fn((...args) => args.join(":"));
  const command = jest.fn();
  const client = {};
  const interaction = {
    isChatInputCommand: () => true,
    commandName: "help",
    locale: "fr",
  };

  await handler(
    { client, log, msg, commandHandlers: { help: command }, version: "15.0.0" },
    interaction,
  );

  expect(command).toHaveBeenCalledWith(
    { client, log, msg: expect.any(Function), version: "15.0.0" },
    interaction,
  );
  const localizedMessage = command.mock.calls[0][0].msg;
  expect(localizedMessage("help", "Help")).toBe("fr:help:Help");
  expect(msg).toHaveBeenCalledWith("fr", "help", "Help");
});

test("ignores interactions without a registered slash command", async () => {
  const command = jest.fn();
  await handler(
    { log: {}, commandHandlers: {} },
    { isChatInputCommand: () => true, commandName: "missing" },
  );
  expect(command).not.toHaveBeenCalled();
});

test("ignores non chat input interactions", async () => {
  const command = jest.fn();
  await handler(
    { log: {}, commandHandlers: { help: command } },
    { isChatInputCommand: () => false, commandName: "help" },
  );
  expect(command).not.toHaveBeenCalled();
});
