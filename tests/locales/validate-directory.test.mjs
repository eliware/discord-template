import { join } from "node:path";
import { validateLocaleDirectory } from "../../src/locales/validate-directory.mjs";
import { createDiscordConfigurationFileSystem } from "../../test-fixtures/discord-configuration.mjs";
import { createFileSystem } from "../../test-fixtures/filesystem.mjs";

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
      [join(directory, "fr.json")]: JSON.stringify({ help: "Aide", extra: "x" }),
      [join(directory, "xx.json")]: JSON.stringify({ help: "Help" }),
      [join(directory, "bad.json")]: "{",
    },
  });
  const errors = validateLocaleDirectory(directory, fileSystem);
  expect(errors).toContain("missing locale: bg");
  expect(errors).toContain("unsupported locale: xx");
  expect(errors).toContain("invalid JSON: bad.json");
  expect(errors).toContain("locale keys do not match: fr.json");
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

test("rejects a base locale that is not an object", () => {
  const directory = "/discord-test/locales";
  const fileSystem = createFileSystem({
    directories: { [directory]: ["en-US.json", "fr.json"] },
    files: {
      [join(directory, "en-US.json")]: "[]",
      [join(directory, "fr.json")]: JSON.stringify({ help: "Aide" }),
    },
  });
  const errors = validateLocaleDirectory(directory, fileSystem);
  expect(errors).toContain("invalid or missing English catalog: en-US.json");
  expect(errors).not.toContain("locale keys do not match: fr.json");
});

test("rejects translated catalogs that are not string maps", () => {
  const directory = "/discord-test/locales";
  const names = ["en-US.json", "fr.json", "de.json", "es.json"];
  const fileSystem = createFileSystem({
    directories: { [directory]: names },
    files: {
      [join(directory, "en-US.json")]: JSON.stringify({ help: "Help" }),
      [join(directory, "fr.json")]: "null",
      [join(directory, "de.json")]: "[]",
      [join(directory, "es.json")]: JSON.stringify({ help: 1 }),
    },
  });
  const errors = validateLocaleDirectory(directory, fileSystem);
  expect(errors).toContain("invalid locale catalog: fr.json");
  expect(errors).toContain("invalid locale catalog: de.json");
  expect(errors).toContain("invalid locale catalog: es.json");
});

test("reports translated catalogs with missing keys", () => {
  const directory = "/discord-test/locales";
  const fileSystem = createFileSystem({
    directories: { [directory]: ["en-US.json", "en-GB.json"] },
    files: {
      [join(directory, "en-US.json")]: JSON.stringify({ help: "Help", commands: "Commands" }),
      [join(directory, "en-GB.json")]: JSON.stringify({ help: "Help" }),
    },
  });
  expect(validateLocaleDirectory(directory, fileSystem)).toContain(
    "locale keys do not match: en-GB.json",
  );
});
