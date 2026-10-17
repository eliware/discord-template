import { supportedLocales } from "../../locales/supported-locales.mjs";
import { isValidCommandDescription } from "./command/description.mjs";
import { isValidCommandName } from "./command/name.mjs";

export function validateHelpDefinition(definition) {
  const errors = [];
  for (const field of ["name_localizations", "description_localizations"]) {
    for (const locale of Object.keys(definition?.[field] ?? {})) {
      if (!supportedLocales.includes(locale))
        errors.push(`unsupported localized locale: ${locale}`);
    }
  }
  if (definition?.type !== 1) errors.push("type must be 1");
  if (!isValidCommandName(definition?.name)) errors.push("name is invalid");
  if (!isValidCommandDescription(definition?.description)) errors.push("description is invalid");
  for (const locale of supportedLocales) {
    if (!isValidCommandName(definition?.name_localizations?.[locale]))
      errors.push(`localized name is missing or invalid: ${locale}`);
    if (!isValidCommandDescription(definition?.description_localizations?.[locale]))
      errors.push(`localized description is missing or invalid: ${locale}`);
  }
  return errors;
}
