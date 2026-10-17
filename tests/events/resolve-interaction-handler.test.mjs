import { expect, jest, test } from "@jest/globals";
import { resolveInteractionHandler } from "../../src/events/resolve-interaction-handler.mjs";

test.each([
  ["chat command", { isChatInputCommand: () => true, commandName: "help" }, "commandHandlers"],
  ["autocomplete", { isAutocomplete: () => true, commandName: "help" }, "autocompleteHandlers"],
  ["component", { isMessageComponent: () => true, customId: "help" }, "componentHandlers"],
])("resolves the %s handler", (_name, interaction, handlerSet) => {
  const handler = jest.fn();
  expect(resolveInteractionHandler({ [handlerSet]: { help: handler } }, interaction)).toBe(handler);
});

test("returns no handler for an unrecognized interaction", () => {
  expect(resolveInteractionHandler({}, {})).toBeUndefined();
});

test("returns no handler when the selected set lacks the key", () => {
  expect(
    resolveInteractionHandler(
      { commandHandlers: {} },
      { isChatInputCommand: () => true, commandName: "missing" },
    ),
  ).toBeUndefined();
});
