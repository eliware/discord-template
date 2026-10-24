export async function startDiscordApplication({
  createClient,
  log,
  version,
  rootDir,
  validateConfiguration,
}) {
  validateConfiguration();
  const presence = {
    activities: [{ name: `discord-template v${version}`, type: 4 }],
    status: "online",
  };
  return createClient({
    log,
    rootDir,
    context: { presence, version },
    intents: {
      Guilds: true,
    },
    signals: true,
    processHandlers: true,
  });
}
