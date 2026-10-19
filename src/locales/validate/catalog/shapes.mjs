import { isStringCatalog } from "./shape.mjs";

export function validateLocaleCatalogShapes(catalogs) {
  return catalogs.flatMap(({ file, values }) =>
    isStringCatalog(values) ? [] : [`invalid locale catalog: ${file}`],
  );
}
