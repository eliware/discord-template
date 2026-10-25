import { expect, test } from "@jest/globals";
import { parseMessageKeyArguments } from "../../src/locales/message-key-arguments.mjs";

test("parses a key and joins the message words", () => {
  expect(parseMessageKeyArguments(["welcome", "Welcome", "to", "the", "app"])).toEqual({
    key: "welcome",
    message: "Welcome to the app",
  });
});

test.each([
  { argumentsList: [] },
  { argumentsList: ["welcome"] },
  { argumentsList: ["", "Welcome"] },
  { argumentsList: ["welcome", ""] },
])("rejects incomplete arguments $argumentsList", ({ argumentsList }) => {
  expect(() => parseMessageKeyArguments(argumentsList)).toThrow(
    'Usage: npm run locale:add -- <key> "<English message>"',
  );
});
