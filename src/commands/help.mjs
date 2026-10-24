// commands/help.mjs
import { MessageFlags } from "discord.js";

export default async function ({ log, msg }, interaction) {
  log.debug("help Request", { interaction });
  const response = {
    content: msg("help", "This is the default help text."),
    flags: MessageFlags.Ephemeral,
  };
  log.debug("help Response", { response });
  await interaction.reply(response);
}
