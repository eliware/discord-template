import { join } from "node:path";
import { validateHelpConfiguration } from "./commands/validate/configuration.mjs";
import { validateLocaleDirectory } from "./locales/validate/directory.mjs";

export function validateDiscordConfiguration(rootDirectory, environment = process.env, fileSystem) {
  const errors = [];
  if (!environment.DISCORD_CLIENT_ID) errors.push("DISCORD_CLIENT_ID is required");
  if (!environment.DISCORD_TOKEN) errors.push("DISCORD_TOKEN is required");
  errors.push(
    ...validateHelpConfiguration(rootDirectory, fileSystem),
    ...validateLocaleDirectory(join(rootDirectory, "locales"), fileSystem),
  );
  if (errors.length) throw new Error(errors.join("\n"));
}
