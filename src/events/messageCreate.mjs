import dispatchGuildMessage from "./message-dispatch.mjs";

export default async function ({ client, log, msg }, message) {
  log.debug("messageCreate", { id: message.id });
  await dispatchGuildMessage({ client, log, msg }, message);
}
