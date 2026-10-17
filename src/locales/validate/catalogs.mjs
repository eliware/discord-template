const isCatalog = (values) =>
  values !== null &&
  typeof values === "object" &&
  !Array.isArray(values) &&
  Object.values(values).every((value) => typeof value === "string");

export function validateLocaleCatalogs(catalogs) {
  const errors = [];
  const englishCatalog = catalogs.find(({ locale }) => locale === "en-US");
  const english = isCatalog(englishCatalog?.values) ? englishCatalog.values : undefined;

  if (!english) errors.push("invalid or missing English catalog: en-US.json");

  for (const { file, locale, values } of catalogs) {
    if (!isCatalog(values)) {
      errors.push(`invalid locale catalog: ${file}`);
      continue;
    }
    if (locale !== "en-US" && english) {
      const missing = Object.keys(english).filter((key) => !Object.hasOwn(values, key));
      const extra = Object.keys(values).filter((key) => !Object.hasOwn(english, key));
      if (missing.length || extra.length) errors.push(`locale keys do not match: ${file}`);
    }
  }

  return errors;
}
