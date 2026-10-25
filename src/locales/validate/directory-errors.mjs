import { validateLocaleCatalogs } from "./catalogs.mjs";
import { validateLocaleInventory } from "./inventory.mjs";

export function validateLocaleDirectoryErrors(files, loaded) {
  return [
    ...validateLocaleInventory(files),
    ...loaded.errors,
    ...validateLocaleCatalogs(loaded.catalogs),
  ];
}
