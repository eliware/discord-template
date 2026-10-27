import { join } from "node:path";
import { supportedLocales } from "./supported-locales.mjs";
import { validateLocaleCatalogShapes } from "./validate/catalog/shapes.mjs";

export function addMessageKey(localeDirectory, key, message, fileSystem) {
  if (typeof key !== "string" || !key.trim())
    throw new TypeError("key must be a non-empty string.");
  if (typeof message !== "string" || !message.trim())
    throw new TypeError("message must be a non-empty string.");

  const files = fileSystem
    .readdirSync(localeDirectory)
    .filter((file) => file.endsWith(".json") && supportedLocales.includes(file.slice(0, -5)));
  const catalogs = files.map((file) => ({
    file,
    catalog: JSON.parse(fileSystem.readFileSync(join(localeDirectory, file), "utf8")),
  }));
  const validationErrors = validateLocaleCatalogShapes(
    catalogs.map(({ file, catalog }) => ({ file, values: catalog })),
  );
  if (validationErrors.length) throw new TypeError(validationErrors.join("\n"));

  const updates = catalogs.filter(({ catalog }) => {
    return typeof catalog[key] !== "string" || !catalog[key].trim();
  });
  for (const { file, catalog } of updates) {
    catalog[key] = file === "en-US.json" ? message : `[TRANSLATE: ${message}]`;
    fileSystem.writeFileSync(join(localeDirectory, file), `${JSON.stringify(catalog, null, 2)}\n`);
  }
  return updates.length;
}
