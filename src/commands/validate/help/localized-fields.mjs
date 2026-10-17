import { supportedLocales } from "../../../locales/supported-locales.mjs";
import { isValidCommandDescription } from "../command/description.mjs";
import { isValidLocalizedCommandName } from "../command/localized-name.mjs";

export function validateLocalizedHelpFields(definition) {
  const errors = [];
  for (const locale of supportedLocales) {
    if (!isValidLocalizedCommandName(definition?.name_localizations?.[locale]))
      errors.push(`localized name is missing or invalid: ${locale}`);
    if (!isValidCommandDescription(definition?.description_localizations?.[locale]))
      errors.push(`localized description is missing or invalid: ${locale}`);
  }
  return errors;
}
