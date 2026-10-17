import { expect, test } from "@jest/globals";
import { isValidCommandDescription } from "../../../../src/commands/validate/command/description.mjs";

test.each([
  ["Help", true],
  ["a".repeat(100), true],
  ["", false],
  ["a".repeat(101), false],
  [1, false],
  [undefined, false],
])("checks command description %s", (description, expected) => {
  expect(isValidCommandDescription(description)).toBe(expected);
});
