import { discordEvents } from "../../events/discord-events.mjs";
import { join } from "node:path";

export async function validateEventInventory(directory, { readDirectory, loadHandler }) {
  const names = readDirectory(directory)
    .filter((file) => file.endsWith(".mjs"))
    .map((file) => file.slice(0, -4));
  const errors = discordEvents
    .filter((name) => !names.includes(name))
    .map((name) => `missing event: ${name}`);
  errors.push(
    ...names
      .filter((name) => !discordEvents.includes(name))
      .map((name) => `unknown event: ${name}`),
  );
  for (const name of names) {
    const handler = await loadHandler(join(directory, `${name}.mjs`));
    if (typeof handler.default !== "function") errors.push(`invalid event handler: ${name}`);
  }
  return errors;
}
