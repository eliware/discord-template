import { readFileSync } from "node:fs";
import { join } from "node:path";
import { validateHelpDefinition } from "./commands/validate-help-definition.mjs";
import { validateLocaleDirectory } from "./locales/validate-directory.mjs";

export function validateDiscordConfiguration(rootDirectory, environment = process.env) {
  const definition = JSON.parse(readFileSync(join(rootDirectory, "commands", "help.json"), "utf8"));
  const errors = [];
  if (!environment.DISCORD_CLIENT_ID) errors.push("DISCORD_CLIENT_ID is required");
  if (!environment.DISCORD_TOKEN) errors.push("DISCORD_TOKEN is required");
  errors.push(
    ...validateHelpDefinition(definition),
    ...validateLocaleDirectory(join(rootDirectory, "locales")),
  );
  if (errors.length) throw new Error(errors.join("\n"));
}
