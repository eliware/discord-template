import { expect, test } from "@jest/globals";
import { validateDiscordCredentials } from "../../src/configuration/credentials.mjs";

test("requires the Discord application ID and bot token", () => {
  expect(validateDiscordCredentials({})).toEqual([
    "DISCORD_CLIENT_ID is required",
    "DISCORD_TOKEN is required",
  ]);
});
