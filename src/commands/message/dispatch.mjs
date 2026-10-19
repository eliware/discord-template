import messageHelp from "./help.mjs";

export default async function dispatchMessage(context, message) {
  if (message.content === "!help") await messageHelp(context, message);
}
