import dispatchMessage from "../commands/message/dispatch.mjs";
import { isEligibleGuildMessage } from "./is-eligible-guild-message.mjs";

export default async function dispatchGuildMessage(context, message) {
  if (!isEligibleGuildMessage(context.client, message)) return;
  await dispatchMessage({ log: context.log, msg: context.msg }, message);
}
