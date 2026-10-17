import { jest, expect, test } from "@jest/globals";
import handler from "../../src/events/interactionCreate.mjs";

test("ignores commands without a registered handler", async () => {
  const interaction = { isChatInputCommand: () => true, commandName: "missing", locale: "en-US" };
  await expect(handler({ log: {}, commandHandlers: {} }, interaction)).resolves.toBeUndefined();
});

test("dispatches the localized interaction to its command handler", async () => {
  const log = { debug: jest.fn() };
  const msg = jest.fn((...args) => args.join(":"));
  const command = jest.fn();
  const context = { client: {}, log, msg, commandHandlers: { help: command }, version: "9.0.0" };
  const interaction = {
    isChatInputCommand: () => true,
    commandName: "help",
    locale: "fr",
    guild: { preferredLocale: "es" },
  };
  await handler(context, interaction);
  expect(command).toHaveBeenCalledWith(
    { client: context.client, log, msg: expect.any(Function), version: "9.0.0" },
    interaction,
  );
});

test("ignores interactions that are not chat input commands", async () => {
  const command = jest.fn();
  const autocomplete = jest.fn();
  const component = jest.fn();
  await handler(
    {
      log: {},
      commandHandlers: { help: command },
      autocompleteHandlers: { help: autocomplete },
      componentHandlers: { help: component },
    },
    {
      isChatInputCommand: () => false,
      isAutocomplete: () => false,
      isMessageComponent: () => false,
      commandName: "help",
    },
  );
  expect(command).not.toHaveBeenCalled();
  expect(autocomplete).not.toHaveBeenCalled();
  expect(component).not.toHaveBeenCalled();
});

test("ignores interactions without unused type predicates", async () => {
  const command = jest.fn();
  await handler(
    { log: {}, commandHandlers: { help: command } },
    { isChatInputCommand: () => false, commandName: "help" },
  );
  expect(command).not.toHaveBeenCalled();
});

test("dispatches autocomplete interactions to their command handler", async () => {
  const autocomplete = jest.fn();
  const interaction = {
    isChatInputCommand: () => false,
    isAutocomplete: () => true,
    isMessageComponent: () => false,
    commandName: "search",
  };
  await handler(
    { log: {}, msg: jest.fn(), autocompleteHandlers: { search: autocomplete } },
    interaction,
  );
  expect(autocomplete).toHaveBeenCalledWith(
    { client: undefined, log: expect.any(Object), msg: expect.any(Function) },
    interaction,
  );
});

test("dispatches component interactions to their custom ID handler", async () => {
  const component = jest.fn();
  const interaction = {
    isChatInputCommand: () => false,
    isAutocomplete: () => false,
    isMessageComponent: () => true,
    customId: "confirm",
  };
  const context = {
    client: {},
    log: {},
    msg: jest.fn(),
    componentHandlers: { confirm: component },
  };
  await handler(context, interaction);
  expect(component).toHaveBeenCalledWith(
    { client: context.client, log: context.log, msg: expect.any(Function) },
    interaction,
  );
});
