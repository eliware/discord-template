import { jest, expect, test } from "@jest/globals";
import { discordDependencies, startDiscordApplication } from "../src/application.mjs";

test("provides the declared application runtime dependencies", () => {
  expect(typeof discordDependencies.createClient).toBe("function");
  expect(typeof discordDependencies.log.info).toBe("function");
  expect(typeof discordDependencies.registerHandlers).toBe("function");
  expect(typeof discordDependencies.registerSignals).toBe("function");
});

test("validates, starts Discord, and registers awaited client shutdown", async () => {
  const log = {};
  const client = { destroy: jest.fn().mockResolvedValue(undefined) };
  const createClient = jest.fn().mockResolvedValue(client);
  const registerHandlers = jest.fn();
  const registerSignals = jest.fn();
  const validateConfiguration = jest.fn();
  await expect(
    startDiscordApplication({
      createClient,
      log,
      registerHandlers,
      registerSignals,
      rootDir: "/repo",
      version: "9.0.0",
      validateConfiguration,
    }),
  ).resolves.toBe(client);
  expect(validateConfiguration).toHaveBeenCalledTimes(1);
  expect(registerHandlers).toHaveBeenCalledWith({ log });
  expect(createClient).toHaveBeenCalledWith({
    log,
    rootDir: "/repo",
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
  });
  const { shutdownHook } = registerSignals.mock.calls[0][0];
  await shutdownHook();
  expect(client.destroy).toHaveBeenCalledTimes(1);
});

test("does not start Discord when configuration validation fails", async () => {
  const createClient = jest.fn();
  await expect(
    startDiscordApplication({
      createClient,
      log: {},
      registerHandlers: jest.fn(),
      registerSignals: jest.fn(),
      rootDir: "/repo",
      version: "9.0.0",
      validateConfiguration: () => {
        throw new Error("invalid config");
      },
    }),
  ).rejects.toThrow("invalid config");
  expect(createClient).not.toHaveBeenCalled();
});
