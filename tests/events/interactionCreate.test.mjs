import { jest, expect, test } from "@jest/globals";
import handler from "../../src/events/interactionCreate.mjs";

test("ignores commands without a registered handler", async () => {
  const interaction = { commandName: "missing", locale: "en-US" };
  await expect(handler({ log: {}, commandHandlers: {} }, interaction)).resolves.toBeUndefined();
});

test("dispatches the localized interaction to its command handler", async () => {
  const log = { debug: jest.fn() };
  const msg = jest.fn((...args) => args.join(":"));
  const command = jest.fn(({ msg: localizedMessage }) =>
    localizedMessage("help", "This is the help text."),
  );
  const context = { client: {}, log, msg, commandHandlers: { help: command }, version: "9.0.0" };
  const interaction = { commandName: "help", locale: "fr", guild: { preferredLocale: "de" } };
  await handler(context, interaction);
  expect(command).toHaveBeenCalledWith(
    { client: context.client, log, msg: expect.any(Function), version: "9.0.0" },
    interaction,
  );
  expect(msg).toHaveBeenCalledWith("fr", "help", "This is the help text.", log);
});

test("uses the guild locale and then the default locale when interaction locale is absent", async () => {
  const msg = jest.fn();
  const command = jest.fn(({ msg: localizedMessage }) =>
    localizedMessage("help", "This is the help text."),
  );
  const context = { log: {}, msg, commandHandlers: { help: command } };
  await handler(context, { commandName: "help", guild: { preferredLocale: "de" } });
  await handler(context, { commandName: "help" });
  expect(msg).toHaveBeenNthCalledWith(1, "de", "help", "This is the help text.", context.log);
  expect(msg).toHaveBeenNthCalledWith(2, "en-US", "help", "This is the help text.", context.log);
});
