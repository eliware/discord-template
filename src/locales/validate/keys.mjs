import { isStringCatalog } from "./catalog-shapes.mjs";

export function validateLocaleKeys(catalogs) {
  const englishCatalog = catalogs.find(({ locale }) => locale === "en-US");
  const english = isStringCatalog(englishCatalog?.values) ? englishCatalog.values : undefined;
  const errors = [];
  if (!english) errors.push("invalid or missing English catalog: en-US.json");

  if (english) {
    for (const { file, locale, values } of catalogs) {
      if (locale === "en-US" || !isStringCatalog(values)) continue;
      const missing = Object.keys(english).filter((key) => !Object.hasOwn(values, key));
      const extra = Object.keys(values).filter((key) => !Object.hasOwn(english, key));
      if (missing.length || extra.length) errors.push(`locale keys do not match: ${file}`);
    }
  }
  return errors;
}
