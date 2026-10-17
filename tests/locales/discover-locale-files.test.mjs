import { expect, test } from "@jest/globals";
import { discoverLocaleFiles } from "../../src/locales/discover-locale-files.mjs";
import { createFileSystem } from "../../test-fixtures/filesystem.mjs";

test("lists JSON catalog files", () => {
  const directory = "/locales";
  const fileSystem = createFileSystem({
    directories: { [directory]: ["en-US.json", "xx.json", "notes.txt"] },
  });

  expect(discoverLocaleFiles(directory, fileSystem)).toEqual(["en-US.json", "xx.json"]);
});
