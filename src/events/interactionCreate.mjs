import { createLocalizedMessage } from "../interactions/create-localized-message.mjs";

export default async function ({ client, log, msg, commandHandlers, ...contextData }, interaction) {
  if (!interaction.isChatInputCommand()) return;
  const handler = commandHandlers?.[interaction.commandName];
  if (!handler) return;
  await handler(
    { client, log, msg: createLocalizedMessage(interaction, msg), ...contextData },
    interaction,
  );
}
