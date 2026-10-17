import { supportedLocales } from "./supported-locales.mjs";

export function discoverLocaleFiles(directory, fileSystem) {
  const files = fileSystem.readdirSync(directory).filter((file) => file.endsWith(".json"));
  const found = files.map((file) => file.slice(0, -5));
  const errors = [];

  for (const locale of supportedLocales) {
    if (!found.includes(locale)) errors.push(`missing locale: ${locale}`);
  }
  for (const locale of found) {
    if (!supportedLocales.includes(locale)) errors.push(`unsupported locale: ${locale}`);
  }

  return { files, errors };
}
