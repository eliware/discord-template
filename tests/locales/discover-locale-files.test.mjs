import { expect, test } from "@jest/globals";
import { discoverLocaleFiles } from "../../src/locales/discover-locale-files.mjs";
import { createFileSystem } from "../../test-fixtures/filesystem.mjs";

test("lists JSON catalogs and reports missing and unsupported locales", () => {
  const directory = "/locales";
  const fileSystem = createFileSystem({
    directories: { [directory]: ["en-US.json", "xx.json", "notes.txt"] },
  });

  const result = discoverLocaleFiles(directory, fileSystem);

  expect(result.files).toEqual(["en-US.json", "xx.json"]);
  expect(result.errors).toContain("unsupported locale: xx");
  expect(result.errors).toContain("missing locale: fr");
});
