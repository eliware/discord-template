export async function startDiscordApplication({
  createClient,
  log,
  registerHandlers,
  registerSignals,
  rootDir,
  version,
  validateConfiguration,
}) {
  validateConfiguration();
  registerHandlers({ log });
  const presence = {
    activities: [{ name: `discord-template v${version}`, type: 4 }],
    status: "online",
  };
  const client = await createClient({
    log,
    rootDir,
    context: { presence, version },
    intents: {
      Guilds: true,
      GuildMessages: true,
      MessageContent: false,
      GuildMembers: false,
      GuildPresences: false,
      GuildVoiceStates: false,
    },
  });
  registerSignals({ log, shutdownHook: () => client.destroy() });
  return client;
}
