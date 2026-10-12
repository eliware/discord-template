import { expect, test } from "@jest/globals";
import { discordEvents } from "../../src/events/discord-events.mjs";

test("lists unique Discord event names", () => {
  expect(new Set(discordEvents).size).toBe(discordEvents.length);
  expect(discordEvents).toContain("messageCreate");
});
