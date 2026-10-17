import { expect, test } from "@jest/globals";
import { validateLocaleCatalogs } from "../../../src/locales/validate/catalogs.mjs";

test("accepts matching string catalogs", () => {
  expect(
    validateLocaleCatalogs([
      { file: "en-US.json", locale: "en-US", values: { help: "Help" } },
      { file: "fr.json", locale: "fr", values: { help: "Aide" } },
    ]),
  ).toEqual([]);
});

test("combines catalog shape and English catalog errors", () => {
  const errors = validateLocaleCatalogs([
    { file: "en-US.json", locale: "en-US", values: [] },
    { file: "fr.json", locale: "fr", values: { help: 1 } },
  ]);

  expect(errors).toContain("invalid or missing English catalog: en-US.json");
  expect(errors).toContain("invalid locale catalog: en-US.json");
  expect(errors).toContain("invalid locale catalog: fr.json");
});
