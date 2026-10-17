import { discoverLocaleFiles } from "../discover-locale-files.mjs";
import { loadLocaleCatalogs } from "../load-locale-catalogs.mjs";
import { validateLocaleCatalogs } from "./catalogs.mjs";
import { validateLocaleInventory } from "./inventory.mjs";

export function validateLocaleDirectory(directory, fileSystem) {
  const files = discoverLocaleFiles(directory, fileSystem);
  const loaded = loadLocaleCatalogs(directory, files, fileSystem);
  return [
    ...validateLocaleInventory(files),
    ...loaded.errors,
    ...validateLocaleCatalogs(loaded.catalogs),
  ];
}
