import { createLocalizedMessage } from "./create-localized-message.mjs";
import { resolveInteractionHandler } from "./resolve-interaction-handler.mjs";

export default async function (
  { client, log, msg, commandHandlers, autocompleteHandlers, componentHandlers, ...contextData },
  interaction,
) {
  const handler = resolveInteractionHandler(
    { commandHandlers, autocompleteHandlers, componentHandlers },
    interaction,
  );
  if (handler) {
    await handler(
      { client, log, msg: createLocalizedMessage(interaction, msg, log), ...contextData },
      interaction,
    );
  }
}
