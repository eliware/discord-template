export const requiredDiscordEvents = ["clientReady", "interactionCreate"];

export function validateEventInventory(directory, { readDirectory, sourceDirectory }) {
  const names = readDirectory(directory)
    .filter((file) => file.endsWith(".mjs"))
    .map((file) => file.slice(0, -4));
  const sources = readDirectory(sourceDirectory)
    .filter((file) => file.endsWith(".mjs"))
    .map((file) => file.slice(0, -4));
  const errors = requiredDiscordEvents
    .filter((name) => !names.includes(name))
    .map((name) => `missing event adapter: ${name}`);
  errors.push(
    ...requiredDiscordEvents
      .filter((name) => !sources.includes(name))
      .map((name) => `missing event handler: ${name}`),
  );
  for (const name of names) {
    if (!sources.includes(name) && !requiredDiscordEvents.includes(name))
      errors.push(`missing event handler: ${name}`);
  }
  for (const name of sources) {
    if (!names.includes(name) && !requiredDiscordEvents.includes(name))
      errors.push(`missing event adapter: ${name}`);
  }
  return errors;
}
