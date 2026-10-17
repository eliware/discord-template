import { join } from "node:path";
import { validateHelpDefinition } from "./help-definition.mjs";

export function validateHelpConfiguration(rootDirectory, fileSystem) {
  const definition = JSON.parse(
    fileSystem.readFileSync(join(rootDirectory, "commands", "help.json"), "utf8"),
  );
  return validateHelpDefinition(definition);
}
