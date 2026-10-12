// events/interactionCreate.mjs
export default async function (
  { client, log, msg, commandHandlers, autocompleteHandlers, componentHandlers, ...contextData },
  interaction,
) {
  let handlers;
  let key;
  if (interaction.isChatInputCommand?.()) {
    handlers = commandHandlers;
    key = interaction.commandName;
  } else if (interaction.isAutocomplete?.()) {
    handlers = autocompleteHandlers;
    key = interaction.commandName;
  } else if (interaction.isMessageComponent?.()) {
    handlers = componentHandlers;
    key = interaction.customId;
  } else {
    return;
  }
  const locale =
    interaction.locale || interaction.guildLocale || interaction.guild?.preferredLocale || "en-US";
  const localeMsg = (key, defaultMsg) => msg(locale, key, defaultMsg, log);
  const handler = handlers?.[key];
  if (handler) {
    await handler({ client, log, msg: localeMsg, ...contextData }, interaction);
  }
}
