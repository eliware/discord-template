import messageHelp from "../commands/message-help.mjs";

export default async function ({ client, log, msg }, message) {
  log.debug("messageCreate", { id: message.id });
  if (message.author.id === client.user.id) return;
  if (message.content === "!help") await messageHelp({ log, msg }, message);
}
