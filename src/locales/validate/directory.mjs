import { discoverLocaleFiles } from "../discover-locale-files.mjs";
import { loadLocaleCatalogs } from "../load-locale-catalogs.mjs";
import { validateLocaleCatalogs } from "./catalogs.mjs";

export function validateLocaleDirectory(directory, fileSystem) {
  const discovery = discoverLocaleFiles(directory, fileSystem);
  const errors = [...discovery.errors];
  const loaded = loadLocaleCatalogs(directory, discovery.files, fileSystem);
  return [...errors, ...loaded.errors, ...validateLocaleCatalogs(loaded.catalogs)];
}
