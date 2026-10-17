import { jest, expect, test } from "@jest/globals";
import { startDiscordApplication } from "../src/application.mjs";

test("validates and starts Discord with library shutdown handlers", async () => {
  const log = {};
  const client = { shutdown: jest.fn().mockResolvedValue(undefined) };
  const createClient = jest.fn().mockResolvedValue(client);
  const validateConfiguration = jest.fn();
  await expect(
    startDiscordApplication({
      createClient,
      log,
      version: "9.0.0",
      validateConfiguration,
    }),
  ).resolves.toBe(client);
  expect(validateConfiguration).toHaveBeenCalledTimes(1);
  expect(createClient).toHaveBeenCalledWith({
    log,
    context: {
      version: "9.0.0",
      presence: { activities: [{ name: "discord-template v9.0.0", type: 4 }], status: "online" },
    },
    intents: {
      Guilds: true,
      GuildMessages: true,
      MessageContent: false,
      GuildMembers: false,
      GuildPresences: false,
      GuildVoiceStates: false,
    },
    signals: true,
    processHandlers: true,
  });
});

test("does not start Discord when configuration validation fails", async () => {
  const createClient = jest.fn();
  await expect(
    startDiscordApplication({
      createClient,
      log: {},
      version: "9.0.0",
      validateConfiguration: () => {
        throw new Error("invalid config");
      },
    }),
  ).rejects.toThrow("invalid config");
  expect(createClient).not.toHaveBeenCalled();
});
