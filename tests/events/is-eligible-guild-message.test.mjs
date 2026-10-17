import { expect, test } from "@jest/globals";
import { isEligibleGuildMessage } from "../../src/events/is-eligible-guild-message.mjs";

test.each([
  ["ready user in a guild", { user: { id: "bot" } }, { author: { id: "user" }, guild: {} }, true],
  ["missing client user", { user: null }, { author: { id: "user" }, guild: {} }, false],
  ["missing author", { user: { id: "bot" } }, { guild: {} }, false],
  ["direct message", { user: { id: "bot" } }, { author: { id: "user" }, guild: null }, false],
  ["bot-authored message", { user: { id: "bot" } }, { author: { id: "bot" }, guild: {} }, false],
])("checks eligibility for a %s", (_name, client, message, expected) => {
  expect(isEligibleGuildMessage(client, message)).toBe(expected);
});
