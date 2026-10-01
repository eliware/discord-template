import { supportedLocales } from "../locales/supported-locales.mjs";

const chatInputName = /^[-_'\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$/u;

export function validateHelpDefinition(definition) {
  const errors = [];
  if (definition?.type !== 1) errors.push("type must be 1");
  if (!chatInputName.test(definition?.name ?? "")) errors.push("name is invalid");
  if (
    typeof definition?.description !== "string" ||
    definition.description.length < 1 ||
    definition.description.length > 100
  )
    errors.push("description is invalid");
  for (const locale of supportedLocales) {
    if (!chatInputName.test(definition?.name_localizations?.[locale] ?? ""))
      errors.push(`localized name is missing or invalid: ${locale}`);
    const description = definition?.description_localizations?.[locale];
    if (typeof description !== "string" || description.length < 1 || description.length > 100)
      errors.push(`localized description is missing or invalid: ${locale}`);
  }
  return errors;
}
