import { discoverLocaleFiles } from "../discover-locale-files.mjs";
import { loadLocaleCatalogs } from "../load-locale-catalogs.mjs";
import { validateLocaleDirectoryErrors } from "./directory-errors.mjs";

export function validateLocaleDirectory(directory, fileSystem) {
  const files = discoverLocaleFiles(directory, fileSystem);
  const loaded = loadLocaleCatalogs(directory, files, fileSystem);
  return validateLocaleDirectoryErrors(files, loaded);
}
