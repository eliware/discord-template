import { validateLocalizedHelpFields } from "./localized-fields.mjs";
import { validateSupportedHelpLocalizationKeys } from "./localization-keys.mjs";

export function validateHelpLocalizations(definition) {
  return [
    ...validateSupportedHelpLocalizationKeys(definition),
    ...validateLocalizedHelpFields(definition),
  ];
}
