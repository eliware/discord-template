import { supportedLocales } from "../../../locales/supported-locales.mjs";

export function validateSupportedHelpLocalizationKeys(definition) {
  const errors = [];
  for (const field of ["name_localizations", "description_localizations"]) {
    for (const locale of Object.keys(definition?.[field] ?? {})) {
      if (!supportedLocales.includes(locale))
        errors.push(`unsupported localized locale: ${locale}`);
    }
  }
  return errors;
}
