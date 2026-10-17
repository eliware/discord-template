import { expect, test } from "@jest/globals";
import { validateLocaleConfiguration } from "../../src/locales/configuration.mjs";
import { createDiscordConfigurationFileSystem } from "../../test-fixtures/discord-configuration.mjs";

test("validates locale configuration under the repository root", () => {
  const { rootDirectory, fileSystem } = createDiscordConfigurationFileSystem();

  expect(validateLocaleConfiguration(rootDirectory, fileSystem)).toEqual([]);
});
