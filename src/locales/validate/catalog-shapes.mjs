export function validateLocaleCatalogShapes(catalogs) {
  return catalogs.flatMap(({ file, values }) =>
    isStringCatalog(values) ? [] : [`invalid locale catalog: ${file}`],
  );
}

export function isStringCatalog(values) {
  return (
    values !== null &&
    typeof values === "object" &&
    !Array.isArray(values) &&
    Object.values(values).every((value) => typeof value === "string")
  );
}
