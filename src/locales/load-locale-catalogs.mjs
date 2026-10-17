import { join } from "node:path";

export function loadLocaleCatalogs(directory, files, fileSystem) {
  const catalogs = [];
  const errors = [];
  for (const file of files) {
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
  return { catalogs, errors };
}
