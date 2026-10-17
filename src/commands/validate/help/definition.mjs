import { isValidCommandDescription } from "../command/description.mjs";
import { isValidCommandName } from "../command/name.mjs";
import { validateHelpLocalizations } from "./localizations.mjs";

export function validateHelpDefinition(definition) {
  const errors = validateHelpLocalizations(definition);
  if (definition?.type !== 1) errors.push("type must be 1");
  if (!isValidCommandName(definition?.name)) errors.push("name is invalid");
  if (!isValidCommandDescription(definition?.description)) errors.push("description is invalid");
  return errors;
}
