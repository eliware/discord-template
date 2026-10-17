import { join } from "node:path";
import { discoverLocaleFiles } from "../discover-locale-files.mjs";
import { validateLocaleCatalogs } from "./catalogs.mjs";

export function validateLocaleDirectory(directory, fileSystem) {
  const discovery = discoverLocaleFiles(directory, fileSystem);
  const errors = [...discovery.errors];
  const catalogs = [];
  for (const file of discovery.files) {
    const locale = file.slice(0, -5);
    try {
      catalogs.push({
        file,
        locale,
        values: JSON.parse(fileSystem.readFileSync(join(directory, file), "utf8")),
      });
    } catch {
      errors.push(`invalid JSON: ${file}`);
    }
  }
  return [...errors, ...validateLocaleCatalogs(catalogs)];
}
