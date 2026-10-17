import { join } from "node:path";
import { validateLocaleDirectory } from "./validate/directory.mjs";

export function validateLocaleConfiguration(rootDirectory, fileSystem) {
  return validateLocaleDirectory(join(rootDirectory, "locales"), fileSystem);
}
