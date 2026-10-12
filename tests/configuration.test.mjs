import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { validateDiscordConfiguration } from "../src/configuration.mjs";

const environment = { DISCORD_CLIENT_ID: "test-client-id", DISCORD_TOKEN: "test-token" };

test("accepts the maintained command and locale configuration", () => {
  const root = fileURLToPath(new URL("../", import.meta.url));
  expect(() => validateDiscordConfiguration(root, environment)).not.toThrow();
});

test("reports command and locale configuration errors before startup", () => {
  const directory = mkdtempSync(join(tmpdir(), "discord-config-"));
  try {
    mkdirSync(join(directory, "commands"));
    mkdirSync(join(directory, "locales"));
    writeFileSync(join(directory, "commands", "help.json"), "{}");
    expect(() => validateDiscordConfiguration(directory, environment)).toThrow(/type must be 1/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("requires the Discord application ID and bot token", () => {
  const root = fileURLToPath(new URL("../", import.meta.url));
  expect(() => validateDiscordConfiguration(root, {})).toThrow(
    /DISCORD_CLIENT_ID is required\nDISCORD_TOKEN is required/,
  );
});

test("uses process environment by default", () => {
  const root = fileURLToPath(new URL("../", import.meta.url));
  const priorClientId = process.env.DISCORD_CLIENT_ID;
  const priorToken = process.env.DISCORD_TOKEN;
  process.env.DISCORD_CLIENT_ID = environment.DISCORD_CLIENT_ID;
  process.env.DISCORD_TOKEN = environment.DISCORD_TOKEN;
  try {
    expect(() => validateDiscordConfiguration(root)).not.toThrow();
  } finally {
    if (priorClientId === undefined) delete process.env.DISCORD_CLIENT_ID;
    else process.env.DISCORD_CLIENT_ID = priorClientId;
    if (priorToken === undefined) delete process.env.DISCORD_TOKEN;
    else process.env.DISCORD_TOKEN = priorToken;
  }
});
