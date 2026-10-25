import { join } from "node:path";
import helpDefinition from "../commands/help.json" with { type: "json" };
import { createDirectoryReader } from "./filesystem/directory-reader.mjs";
import { createFileReader } from "./filesystem/file-reader.mjs";
import { localeCatalogs } from "./locale-catalogs.mjs";

export { helpDefinition };

export function createDiscordConfigurationFileSystem({
  rootDirectory = "/discord-test",
  definition = helpDefinition,
  localeFiles = Object.fromEntries(
    Object.entries(localeCatalogs).map(([locale, catalog]) => [locale, JSON.stringify(catalog)]),
  ),
} = {}) {
  const commandPath = join(rootDirectory, "commands", "help.json");
  const localeDirectory = join(rootDirectory, "locales");
  const files = {
    [commandPath]: JSON.stringify(definition),
    ...Object.fromEntries(
      Object.entries(localeFiles).map(([name, contents]) => [
        join(localeDirectory, name.endsWith(".json") ? name : `${name}.json`),
        contents,
      ]),
    ),
  };
  const fileSystem = {
    ...createFileReader({ files }),
    ...createDirectoryReader({
      directories: {
        [localeDirectory]: Object.keys(localeFiles).map((name) =>
          name.endsWith(".json") ? name : `${name}.json`,
        ),
      },
    }),
  };

  return { rootDirectory, localeDirectory, fileSystem };
}
