import { supportedLocales } from "../../../locales/supported-locales.mjs";
import { validateLocalizedHelpFields } from "./localized-fields.mjs";

export function validateHelpLocalizations(definition) {
  const errors = [];
  for (const field of ["name_localizations", "description_localizations"]) {
    for (const locale of Object.keys(definition?.[field] ?? {})) {
      if (!supportedLocales.includes(locale))
        errors.push(`unsupported localized locale: ${locale}`);
    }
  }
  return [...errors, ...validateLocalizedHelpFields(definition)];
}
