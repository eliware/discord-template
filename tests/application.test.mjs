import { expect, jest, test } from "@jest/globals";
import { startDiscordApplication } from "../src/application.mjs";

function createDependencies(overrides = {}) {
  const order = [];
  const client = {
    shutdown: jest.fn(async () => order.push("Discord stopped")),
  };
  const healthServer = {
    start: jest.fn(async () => order.push("HTTP started")),
    close: jest.fn(async () => order.push("HTTP stopped")),
    setReady: jest.fn(),
  };
  let signalOptions;
  const dependencies = {
    createClient: jest.fn(async () => {
      order.push("Discord started");
      return client;
    }),
    createHealthServer: jest.fn(() => healthServer),
    log: { warn: jest.fn() },
    registerHandlers: jest.fn(() => order.push("Handlers registered")),
    registerSignals: jest.fn((options) => {
      signalOptions = options;
    }),
    version: "15.1.0",
    rootDir: "C:/app",
    validateConfiguration: jest.fn(),
    ...overrides,
  };
  return { dependencies, client, healthServer, order, getSignalOptions: () => signalOptions };
}

test("validates before startup and coordinates orderly shutdown", async () => {
  const { dependencies, client, healthServer, order, getSignalOptions } = createDependencies();
  await expect(startDiscordApplication(dependencies)).resolves.toBe(client);

  expect(order).toEqual(["Handlers registered", "HTTP started", "Discord started"]);
  expect(dependencies.registerHandlers).toHaveBeenCalledWith({ log: dependencies.log });
  expect(dependencies.validateConfiguration).toHaveBeenCalledTimes(1);
  expect(dependencies.createClient).toHaveBeenCalledWith({
    log: dependencies.log,
    rootDir: "C:/app",
    context: {
      presence: {
        activities: [{ name: "discord-template v15.1.0", type: 4 }],
        status: "online",
      },
      version: "15.1.0",
      healthServer,
    },
    intents: { Guilds: true },
    signals: false,
  });
  expect(getSignalOptions()).toEqual({ log: dependencies.log, shutdownHook: expect.any(Function) });

  const firstShutdown = client.shutdown();
  expect(client.shutdown()).toBe(firstShutdown);
  await firstShutdown;
  expect(healthServer.setReady).toHaveBeenCalledWith(false);
  expect(order).toEqual([
    "Handlers registered",
    "HTTP started",
    "Discord started",
    "HTTP stopped",
    "Discord stopped",
  ]);
});

test("does not start services when configuration validation fails", async () => {
  const { dependencies } = createDependencies({
    validateConfiguration: () => {
      throw new Error("invalid config");
    },
  });
  await expect(startDiscordApplication(dependencies)).rejects.toThrow("invalid config");
  expect(dependencies.createHealthServer).not.toHaveBeenCalled();
  expect(dependencies.createClient).not.toHaveBeenCalled();
  expect(dependencies.registerHandlers).not.toHaveBeenCalled();
});

test("closes the HTTP server when Discord startup fails", async () => {
  const { dependencies, healthServer, order } = createDependencies({
    createClient: jest.fn(async () => {
      throw new Error("Discord startup failed");
    }),
  });
  await expect(startDiscordApplication(dependencies)).rejects.toThrow("Discord startup failed");
  expect(healthServer.setReady).toHaveBeenCalledWith(false);
  expect(order).toEqual(["Handlers registered", "HTTP started", "HTTP stopped"]);
});

test("finishes Discord shutdown when a signal arrives during startup", async () => {
  let resolveClient;
  let signalOptions;
  let markClientStarted;
  const clientStarted = new Promise((resolve) => {
    markClientStarted = resolve;
  });
  const client = { shutdown: jest.fn() };
  const discordShutdown = client.shutdown;
  const { dependencies, healthServer } = createDependencies({
    createClient: jest.fn(
      () =>
        new Promise((resolve) => {
          resolveClient = resolve;
          markClientStarted();
        }),
    ),
    registerSignals: jest.fn((options) => {
      signalOptions = options;
    }),
  });

  const startup = startDiscordApplication(dependencies);
  await clientStarted;
  const shutdown = signalOptions.shutdownHook();
  expect(healthServer.close).toHaveBeenCalledTimes(1);
  resolveClient(client);
  await expect(startup).resolves.toBeUndefined();
  await shutdown;
  expect(discordShutdown).toHaveBeenCalledTimes(1);
});

test.each([new Error("close failed"), {}])(
  "logs health server shutdown failures: %p",
  async (error) => {
    const { dependencies, client } = createDependencies();
    dependencies.createHealthServer.mockReturnValue({
      start: jest.fn(),
      close: jest.fn(async () => Promise.reject(error)),
      setReady: jest.fn(),
    });
    await startDiscordApplication(dependencies);
    await client.shutdown();
    expect(dependencies.log.warn).toHaveBeenCalledWith("Health server shutdown failed", {
      error: error?.message || String(error),
    });
  },
);

test.each([new Error("shutdown failed"), {}])(
  "logs Discord shutdown failures: %p",
  async (error) => {
    const { dependencies, client } = createDependencies();
    client.shutdown.mockRejectedValue(error);
    await startDiscordApplication(dependencies);
    await client.shutdown();
    expect(dependencies.log.warn).toHaveBeenCalledWith("Discord shutdown failed", {
      error: error?.message || String(error),
    });
  },
);
