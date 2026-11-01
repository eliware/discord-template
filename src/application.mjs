export async function startDiscordApplication({
  createClient,
  createHealthServer,
  log,
  registerHandlers,
  registerSignals,
  version,
  rootDir,
  validateConfiguration,
}) {
  validateConfiguration();
  registerHandlers({ log });
  const healthServer = createHealthServer();
  await healthServer.start();

  let client;
  let discordShutdown;
  let startupPending = true;
  let shuttingDown = false;
  let shutdownPromise;
  let finishStartup;
  const startupComplete = new Promise((resolve) => {
    finishStartup = resolve;
  });
  const shutdownHealthServer = async () => {
    try {
      healthServer.setReady(false);
      await healthServer.close();
    } catch (error) {
      log.warn("Health server shutdown failed", { error: error?.message || String(error) });
    }
  };
  const shutdownDiscord = async () => {
    try {
      await discordShutdown();
    } catch (error) {
      log.warn("Discord shutdown failed", { error: error?.message || String(error) });
    }
  };
  const shutdownApp = () => {
    shuttingDown = true;
    if (!shutdownPromise) {
      const waitForStartup = startupPending;
      shutdownPromise = (async () => {
        await shutdownHealthServer();
        if (waitForStartup) await startupComplete;
        if (discordShutdown) await shutdownDiscord();
      })();
    }
    return shutdownPromise;
  };

  const presence = {
    activities: [{ name: `discord-template v${version}`, type: 4 }],
    status: "online",
  };
  try {
    registerSignals({ log, shutdownHook: shutdownApp });
    client = await createClient({
      log,
      rootDir,
      context: { presence, version, healthServer },
      intents: {
        Guilds: true,
      },
      signals: false,
    });
    discordShutdown = client.shutdown.bind(client);
    client.shutdown = shutdownApp;
    startupPending = false;
    finishStartup();
    if (shuttingDown) {
      await shutdownApp();
      return undefined;
    }
    return client;
  } catch (error) {
    startupPending = false;
    finishStartup();
    await shutdownApp();
    throw error;
  }
}
