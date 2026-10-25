import { expect, test } from "@jest/globals";
import { validateDiscordCredentials } from "../../src/configuration/credentials.mjs";

test("requires the Discord application ID and bot token", () => {
  expect(validateDiscordCredentials({})).toEqual([
    "DISCORD_CLIENT_ID is required",
    "DISCORD_TOKEN is required",
    "DISCORD_TEST_SERVER_ID must be a 17 to 20 digit Discord server ID",
    "Set DISCORD_TEST_SERVER_AUTHORIZED to true only after the test server owner gives permission",
  ]);
});

test("requires a valid test server ID and owner authorization", () => {
  expect(
    validateDiscordCredentials({
      DISCORD_CLIENT_ID: "client-id",
      DISCORD_TOKEN: "token",
      DISCORD_TEST_SERVER_ID: "not-a-server-id",
      DISCORD_TEST_SERVER_AUTHORIZED: "false",
    }),
  ).toEqual([
    "DISCORD_TEST_SERVER_ID must be a 17 to 20 digit Discord server ID",
    "Set DISCORD_TEST_SERVER_AUTHORIZED to true only after the test server owner gives permission",
  ]);
});
