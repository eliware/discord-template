import { expect, test } from "@jest/globals";
import { isValidLocalizedCommandName } from "../../../../src/commands/validate/command/localized-name.mjs";

test.each([
  ["help", true],
  ["Hilfe", false],
  ["a".repeat(33), false],
])("checks localized command name %s", (name, expected) => {
  expect(isValidLocalizedCommandName(name)).toBe(expected);
});
