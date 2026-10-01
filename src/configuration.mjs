import { readFileSync } from "node:fs";
import { join } from "node:path";
import { validateHelpDefinition } from "./commands/validate-help-definition.mjs";
import { validateLocaleDirectory } from "./locales/validate-directory.mjs";

export function validateDiscordConfiguration(rootDirectory) {
  const definition = JSON.parse(readFileSync(join(rootDirectory, "commands", "help.json"), "utf8"));
  const errors = [
    ...validateHelpDefinition(definition),
    ...validateLocaleDirectory(join(rootDirectory, "locales")),
  ];
  if (errors.length) throw new Error(errors.join("\n"));
}
