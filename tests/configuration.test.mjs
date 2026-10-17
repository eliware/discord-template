import { validateDiscordConfiguration } from "../src/configuration.mjs";
import { createDiscordConfigurationFileSystem } from "../test-fixtures/discord-configuration.mjs";

const environment = { DISCORD_CLIENT_ID: "test-client-id", DISCORD_TOKEN: "test-token" };

test("accepts the maintained command and locale configuration", () => {
  const { rootDirectory, fileSystem } = createDiscordConfigurationFileSystem();
  expect(() => validateDiscordConfiguration(rootDirectory, environment, fileSystem)).not.toThrow();
});

test("reports command and locale configuration errors before startup", () => {
  const { rootDirectory, fileSystem } = createDiscordConfigurationFileSystem({ definition: {} });
  expect(() => validateDiscordConfiguration(rootDirectory, environment, fileSystem)).toThrow(
    /type must be 1/,
  );
});

test("requires the Discord application ID and bot token", () => {
  const { rootDirectory, fileSystem } = createDiscordConfigurationFileSystem();
  expect(() => validateDiscordConfiguration(rootDirectory, {}, fileSystem)).toThrow(
    /DISCORD_CLIENT_ID is required\nDISCORD_TOKEN is required/,
  );
});

test("uses process environment by default", () => {
  const { rootDirectory, fileSystem } = createDiscordConfigurationFileSystem();
  const priorClientId = process.env.DISCORD_CLIENT_ID;
  const priorToken = process.env.DISCORD_TOKEN;
  process.env.DISCORD_CLIENT_ID = environment.DISCORD_CLIENT_ID;
  process.env.DISCORD_TOKEN = environment.DISCORD_TOKEN;
  try {
    expect(() => validateDiscordConfiguration(rootDirectory, undefined, fileSystem)).not.toThrow();
  } finally {
    if (priorClientId === undefined) delete process.env.DISCORD_CLIENT_ID;
    else process.env.DISCORD_CLIENT_ID = priorClientId;
    if (priorToken === undefined) delete process.env.DISCORD_TOKEN;
    else process.env.DISCORD_TOKEN = priorToken;
  }
});
