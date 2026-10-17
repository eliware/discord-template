import { join } from "node:path";
import { validateLocaleDirectory } from "../../../src/locales/validate/directory.mjs";
import { createDiscordConfigurationFileSystem } from "../../../test-fixtures/discord-configuration.mjs";
import { createFileSystem } from "../../../test-fixtures/filesystem.mjs";

test("accepts the maintained locale catalogs", () => {
  const { localeDirectory, fileSystem } = createDiscordConfigurationFileSystem();
  expect(validateLocaleDirectory(localeDirectory, fileSystem)).toEqual([]);
});

test("reports missing, unsupported, malformed, and mismatched locale data", () => {
  const directory = "/discord-test/locales";
  const names = ["en-US.json", "fr.json", "xx.json", "bad.json"];
  const fileSystem = createFileSystem({
    directories: { [directory]: names },
    files: {
      [join(directory, "en-US.json")]: JSON.stringify({ help: "Help" }),
      [join(directory, "fr.json")]: JSON.stringify({ help: "Aide" }),
      [join(directory, "xx.json")]: JSON.stringify({ help: "Help" }),
      [join(directory, "bad.json")]: "{",
    },
  });
  const errors = validateLocaleDirectory(directory, fileSystem);
  expect(errors).toContain("missing locale: bg");
  expect(errors).toContain("unsupported locale: xx");
  expect(errors).toContain("invalid JSON: bad.json");
});

test("reports a missing base locale without comparing translated keys", () => {
  const directory = "/discord-test/locales";
  const fileSystem = createFileSystem({
    directories: { [directory]: ["fr.json"] },
    files: { [join(directory, "fr.json")]: JSON.stringify({ help: "Aide" }) },
  });
  const errors = validateLocaleDirectory(directory, fileSystem);
  expect(errors).toContain("invalid or missing English catalog: en-US.json");
  expect(errors).not.toContain("locale keys do not match: fr.json");
});
