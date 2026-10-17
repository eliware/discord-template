export function resolveInteractionHandler(
  { commandHandlers, autocompleteHandlers, componentHandlers },
  interaction,
) {
  if (interaction.isChatInputCommand?.()) return commandHandlers?.[interaction.commandName];
  if (interaction.isAutocomplete?.()) return autocompleteHandlers?.[interaction.commandName];
  if (interaction.isMessageComponent?.()) return componentHandlers?.[interaction.customId];
  return undefined;
}
