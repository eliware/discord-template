import { validateDiscordCredentials } from "./configuration/credentials.mjs";
import { validateHelpConfiguration } from "./commands/validate/configuration.mjs";
import { validateLocaleConfiguration } from "./locales/configuration.mjs";

export function validateDiscordConfiguration(rootDirectory, environment = process.env, fileSystem) {
  const errors = validateDiscordCredentials(environment);
  errors.push(
    ...validateHelpConfiguration(rootDirectory, fileSystem),
    ...validateLocaleConfiguration(rootDirectory, fileSystem),
  );
  if (errors.length) throw new Error(errors.join("\n"));
}
