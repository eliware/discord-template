import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { supportedLocales } from "./supported-locales.mjs";

export function validateLocaleDirectory(directory) {
  const errors = [];
  const files = readdirSync(directory).filter((file) => file.endsWith(".json"));
  const found = files.map((file) => file.slice(0, -5));
  for (const locale of supportedLocales) {
    if (!found.includes(locale)) errors.push(`missing locale: ${locale}`);
  }
  let english;
  try {
    english = JSON.parse(readFileSync(join(directory, "en-US.json"), "utf8"));
  } catch {
    errors.push("invalid or missing base locale: en-US.json");
  }
  for (const file of files) {
    const locale = file.slice(0, -5);
    let values;
    try {
      values = JSON.parse(readFileSync(join(directory, file), "utf8"));
    } catch {
      errors.push(`invalid JSON: ${file}`);
      continue;
    }
    if (!supportedLocales.includes(locale)) errors.push(`unsupported locale: ${locale}`);
    if (locale !== "en-US") {
      const missing = Object.keys(english ?? {}).filter((key) => !Object.hasOwn(values, key));
      const extra = Object.keys(values).filter((key) => !Object.hasOwn(english ?? {}, key));
      if (missing.length || extra.length) errors.push(`locale keys differ: ${file}`);
    }
  }
  return errors;
}
