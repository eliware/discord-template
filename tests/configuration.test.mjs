import { validateDiscordConfiguration } from "../src/configuration.mjs";
import { createDiscordConfigurationFileSystem } from "../test-fixtures/discord-configuration.mjs";

const environment = {
  DISCORD_CLIENT_ID: "test-client-id",
  DISCORD_TOKEN: "test-token",
  DISCORD_TEST_SERVER_ID: "123456789012345678",
  DISCORD_TEST_SERVER_AUTHORIZED: "true",
};

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
    /DISCORD_CLIENT_ID is required\nDISCORD_TOKEN is required\nDISCORD_TEST_SERVER_ID must be a 17 to 20 digit Discord server ID\nSet DISCORD_TEST_SERVER_AUTHORIZED to true/,
  );
});

test("uses process environment by default", () => {
  const { rootDirectory, fileSystem } = createDiscordConfigurationFileSystem();
  const keys = Object.keys(environment);
  const previous = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  Object.assign(process.env, environment);
  try {
    expect(() => validateDiscordConfiguration(rootDirectory, undefined, fileSystem)).not.toThrow();
  } finally {
    for (const key of keys) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  }
});
