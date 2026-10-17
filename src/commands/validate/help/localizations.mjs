import { supportedLocales } from "../../../locales/supported-locales.mjs";
import { isValidCommandDescription } from "../command/description.mjs";
import { isValidLocalizedCommandName } from "../command/localized-name.mjs";

export function validateHelpLocalizations(definition) {
  const errors = [];
  for (const field of ["name_localizations", "description_localizations"]) {
    for (const locale of Object.keys(definition?.[field] ?? {})) {
      if (!supportedLocales.includes(locale))
        errors.push(`unsupported localized locale: ${locale}`);
    }
  }
  for (const locale of supportedLocales) {
    if (!isValidLocalizedCommandName(definition?.name_localizations?.[locale]))
      errors.push(`localized name is missing or invalid: ${locale}`);
    if (!isValidCommandDescription(definition?.description_localizations?.[locale]))
      errors.push(`localized description is missing or invalid: ${locale}`);
  }
  return errors;
}
