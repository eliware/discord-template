import messageHelp from "./message-help.mjs";

export default async function dispatchMessageCommand(context, message) {
  if (message.content === "!help") await messageHelp(context, message);
}
