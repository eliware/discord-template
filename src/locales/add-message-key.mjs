import { join } from "node:path";

export function addMessageKey(localeDirectory, key, message, fileSystem) {
  if (typeof key !== "string" || !key.trim())
    throw new TypeError("key must be a non-empty string.");
  if (typeof message !== "string" || !message.trim())
    throw new TypeError("message must be a non-empty string.");

  let updated = 0;
  const files = fileSystem.readdirSync(localeDirectory).filter((file) => file.endsWith(".json"));
  for (const file of files) {
    const path = join(localeDirectory, file);
    const catalog = JSON.parse(fileSystem.readFileSync(path, "utf8"));
    if (Object.hasOwn(catalog, key)) continue;
    catalog[key] = message;
    fileSystem.writeFileSync(path, `${JSON.stringify(catalog, null, 2)}\n`);
    updated += 1;
  }
  return updated;
}
