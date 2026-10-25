import { expect, test } from "@jest/globals";
import { validateLocaleDirectory } from "../../../src/locales/validate/directory.mjs";
import { createDiscordConfigurationFileSystem } from "../../../test-fixtures/discord-configuration.mjs";

test("discovers, loads, and validates the maintained locale catalogs", () => {
  const { localeDirectory, fileSystem } = createDiscordConfigurationFileSystem();
  expect(validateLocaleDirectory(localeDirectory, fileSystem)).toEqual([]);
});
