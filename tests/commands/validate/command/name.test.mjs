import { expect, test } from "@jest/globals";
import { isValidCommandName } from "../../../../src/commands/validate/command/name.mjs";

test.each([
  ["help", true],
  ["HELP", false],
  ["a".repeat(32), true],
  ["a".repeat(33), false],
  ["help command", false],
  ["", false],
  [undefined, false],
])("checks command name %s", (name, expected) => {
  expect(isValidCommandName(name)).toBe(expected);
});
