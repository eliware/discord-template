export function createLocalizedMessage(interaction, msg) {
  const locale =
    interaction.locale || interaction.guildLocale || interaction.guild?.preferredLocale || "en-US";
  return (key, defaultMessage) => msg(locale, key, defaultMessage);
}
