import { join } from "node:path";
import { supportedLocales } from "./supported-locales.mjs";

const isCatalog = (values) =>
  values !== null &&
  typeof values === "object" &&
  !Array.isArray(values) &&
  Object.values(values).every((value) => typeof value === "string");

export function validateLocaleDirectory(directory, fileSystem) {
  const errors = [];
  const files = fileSystem.readdirSync(directory).filter((file) => file.endsWith(".json"));
  const found = files.map((file) => file.slice(0, -5));
  for (const locale of supportedLocales) {
    if (!found.includes(locale)) errors.push(`missing locale: ${locale}`);
  }
  let english;
  try {
    english = JSON.parse(fileSystem.readFileSync(join(directory, "en-US.json"), "utf8"));
    if (!isCatalog(english)) throw new Error();
  } catch {
    errors.push("invalid or missing English catalog: en-US.json");
    english = undefined;
  }
  for (const file of files) {
    const locale = file.slice(0, -5);
    let values;
    try {
      values = JSON.parse(fileSystem.readFileSync(join(directory, file), "utf8"));
    } catch {
      errors.push(`invalid JSON: ${file}`);
      continue;
    }
    if (!isCatalog(values)) {
      errors.push(`invalid locale catalog: ${file}`);
      continue;
    }
    if (!supportedLocales.includes(locale)) errors.push(`unsupported locale: ${locale}`);
    if (locale !== "en-US" && english) {
      const missing = Object.keys(english).filter((key) => !Object.hasOwn(values, key));
      const extra = Object.keys(values).filter((key) => !Object.hasOwn(english, key));
      if (missing.length || extra.length) errors.push(`locale keys do not match: ${file}`);
    }
  }
  return errors;
}
