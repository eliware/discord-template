import { supportedLocales } from "../supported-locales.mjs";

export function validateLocaleInventory(files) {
  const locales = files.map((file) => file.slice(0, -5));
  const errors = [];
  for (const locale of supportedLocales) {
    if (!locales.includes(locale)) errors.push(`missing locale: ${locale}`);
  }
  for (const locale of locales) {
    if (!supportedLocales.includes(locale)) errors.push(`unsupported locale: ${locale}`);
  }
  return errors;
}
