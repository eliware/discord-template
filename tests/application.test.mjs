import { jest, expect, test } from "@jest/globals";
import { startDiscordApplication } from "../src/application.mjs";

test("validates and starts Discord with one app root and library shutdown handlers", async () => {
  const log = {};
  const client = { shutdown: jest.fn().mockResolvedValue(undefined) };
  const createClient = jest.fn().mockResolvedValue(client);
  const validateConfiguration = jest.fn();
  await expect(
    startDiscordApplication({
      createClient,
      log,
      version: "9.0.0",
      rootDir: "C:/app",
      validateConfiguration,
    }),
  ).resolves.toBe(client);
  expect(validateConfiguration).toHaveBeenCalledTimes(1);
  expect(createClient).toHaveBeenCalledWith({
    log,
    rootDir: "C:/app",
    context: {
      version: "9.0.0",
      presence: { activities: [{ name: "discord-template v9.0.0", type: 4 }], status: "online" },
    },
    intents: { Guilds: true },
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
      rootDir: "C:/app",
      validateConfiguration: () => {
        throw new Error("invalid config");
      },
    }),
  ).rejects.toThrow("invalid config");
  expect(createClient).not.toHaveBeenCalled();
});
