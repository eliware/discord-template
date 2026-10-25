import { expect, test } from "@jest/globals";
import { discoverLocaleFiles } from "../../src/locales/discover-locale-files.mjs";
import { createDirectoryReader } from "../../test-fixtures/filesystem/directory-reader.mjs";

test("lists JSON catalog files", () => {
  const directory = "/locales";
  const fileSystem = createDirectoryReader({
    directories: { [directory]: ["en-US.json", "xx.json", "notes.txt"] },
  });

  expect(discoverLocaleFiles(directory, fileSystem)).toEqual(["en-US.json", "xx.json"]);
});
