import { discordEvents } from "../../events/discord-events.mjs";
import { readdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { join } from "node:path";

export async function validateEventInventory(directory) {
  const names = readdirSync(directory)
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
    const handler = await import(pathToFileURL(join(directory, `${name}.mjs`)));
    if (typeof handler.default !== "function") errors.push(`invalid event handler: ${name}`);
  }
  return errors;
}
