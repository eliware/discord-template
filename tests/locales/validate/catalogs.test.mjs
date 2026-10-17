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

test("rejects catalogs that are not string maps", () => {
  const errors = validateLocaleCatalogs([
    { file: "en-US.json", locale: "en-US", values: [] },
    { file: "fr.json", locale: "fr", values: { help: 1 } },
  ]);

  expect(errors).toContain("invalid or missing English catalog: en-US.json");
  expect(errors).toContain("invalid locale catalog: en-US.json");
  expect(errors).toContain("invalid locale catalog: fr.json");
});

test("reports missing and extra translation keys", () => {
  expect(
    validateLocaleCatalogs([
      { file: "en-US.json", locale: "en-US", values: { help: "Help", about: "About" } },
      { file: "fr.json", locale: "fr", values: { help: "Aide", extra: "Autre" } },
    ]),
  ).toContain("locale keys do not match: fr.json");
});

test("does not compare translations when the English catalog is absent", () => {
  const errors = validateLocaleCatalogs([
    { file: "fr.json", locale: "fr", values: { help: "Aide" } },
  ]);

  expect(errors).toContain("invalid or missing English catalog: en-US.json");
  expect(errors).not.toContain("locale keys do not match: fr.json");
});
