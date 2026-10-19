import { expect, test } from "@jest/globals";
import { validateLocaleCatalogShapes } from "../../../../src/locales/validate/catalog/shapes.mjs";

test("rejects catalogs that are not string maps", () => {
  expect(
    validateLocaleCatalogShapes([
      { file: "empty.json", values: [] },
      { file: "wrong-value.json", values: { help: 1 } },
    ]),
  ).toEqual(["invalid locale catalog: empty.json", "invalid locale catalog: wrong-value.json"]);
});
