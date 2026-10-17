import { expect, test } from "@jest/globals";
import { validateLocaleKeys } from "../../../src/locales/validate/keys.mjs";

test("reports missing and extra translation keys", () => {
  expect(
    validateLocaleKeys([
      { file: "en-US.json", locale: "en-US", values: { help: "Help", about: "About" } },
      { file: "fr.json", locale: "fr", values: { help: "Aide", extra: "Autre" } },
    ]),
  ).toContain("locale keys do not match: fr.json");
});

test("requires a valid English catalog before comparing keys", () => {
  const errors = validateLocaleKeys([{ file: "fr.json", locale: "fr", values: { help: "Aide" } }]);

  expect(errors).toContain("invalid or missing English catalog: en-US.json");
  expect(errors).not.toContain("locale keys do not match: fr.json");
});
