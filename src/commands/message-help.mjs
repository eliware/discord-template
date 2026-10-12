export default async function ({ log, msg }, message) {
  const locale = message.guild?.preferredLocale || "en-US";
  const response = msg(locale, "help", "This is the help text.");
  await message.reply(response);
  log.debug("!help Response", { response });
}
