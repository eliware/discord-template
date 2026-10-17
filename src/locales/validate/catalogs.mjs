import { validateLocaleCatalogShapes } from "./catalog-shapes.mjs";
import { validateLocaleKeys } from "./keys.mjs";

export function validateLocaleCatalogs(catalogs) {
  return [...validateLocaleCatalogShapes(catalogs), ...validateLocaleKeys(catalogs)];
}
