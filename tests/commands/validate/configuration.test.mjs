import { expect, test } from "@jest/globals";
import { validateHelpConfiguration } from "../../../src/commands/validate/configuration.mjs";
import { createDiscordConfigurationFileSystem } from "../../../test-fixtures/discord-configuration.mjs";

test("validates the help definition loaded from the command configuration", () => {
  const { rootDirectory, fileSystem } = createDiscordConfigurationFileSystem({ definition: {} });

  expect(validateHelpConfiguration(rootDirectory, fileSystem)).toContain("type must be 1");
});
