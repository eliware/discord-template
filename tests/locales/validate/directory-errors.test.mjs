import { expect, test } from "@jest/globals";
import { validateLocaleDirectoryErrors } from "../../../src/locales/validate/directory-errors.mjs";

test("aggregates inventory, loading, and catalog validation errors", () => {
  const files = ["en-US.json", "fr.json", "xx.json", "bad.json"];
  const loaded = {
    catalogs: [
      { file: "en-US.json", locale: "en-US", values: { help: "Help" } },
      { file: "fr.json", locale: "fr", values: { help: "Aide" } },
      { file: "xx.json", locale: "xx", values: { help: "Help", extra: "Extra" } },
    ],
    errors: ["invalid JSON: bad.json"],
  };

  const errors = validateLocaleDirectoryErrors(files, loaded);
  expect(errors).toContain("missing locale: bg");
  expect(errors).toContain("unsupported locale: xx");
  expect(errors).toContain("invalid JSON: bad.json");
  expect(errors).toContain("locale keys do not match: xx.json");
});

test("does not compare translated keys when the English catalog is missing", () => {
  const loaded = {
    catalogs: [{ file: "fr.json", locale: "fr", values: { help: "Aide" } }],
    errors: [],
  };

  const errors = validateLocaleDirectoryErrors(["fr.json"], loaded);
  expect(errors).toContain("invalid or missing English catalog: en-US.json");
  expect(errors).not.toContain("locale keys do not match: fr.json");
});
