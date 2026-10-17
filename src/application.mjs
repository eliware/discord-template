export async function startDiscordApplication({
  createClient,
  log,
  version,
  validateConfiguration,
}) {
  validateConfiguration();
  const presence = {
    activities: [{ name: `discord-template v${version}`, type: 4 }],
    status: "online",
  };
  return createClient({
    log,
    context: { presence, version },
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
}
