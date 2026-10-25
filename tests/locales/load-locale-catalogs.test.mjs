import { join } from "node:path";
import { expect, test } from "@jest/globals";
import { loadLocaleCatalogs } from "../../src/locales/load-locale-catalogs.mjs";
import { createFileReader } from "../../test-fixtures/filesystem/file-reader.mjs";

test("loads parsed catalogs and reports invalid JSON files", () => {
  const directory = "/locales";
  const fileSystem = createFileReader({
    files: {
      [join(directory, "en-US.json")]: JSON.stringify({ help: "Help" }),
      [join(directory, "fr.json")]: "{",
    },
  });

  expect(loadLocaleCatalogs(directory, ["en-US.json", "fr.json"], fileSystem)).toEqual({
    catalogs: [{ file: "en-US.json", locale: "en-US", values: { help: "Help" } }],
    errors: ["invalid JSON: fr.json"],
  });
});
