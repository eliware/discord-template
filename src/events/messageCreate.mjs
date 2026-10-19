import dispatchMessage from "../commands/message/dispatch.mjs";
import { isEligibleGuildMessage } from "./is-eligible-guild-message.mjs";

export default async function ({ client, log, msg }, message) {
  log.debug("messageCreate", { id: message.id });
  if (!isEligibleGuildMessage(client, message)) return;
  await dispatchMessage({ log, msg }, message);
}
