import { expect, test } from "@jest/globals";
import { isStringCatalog } from "../../../../src/locales/validate/catalog/shape.mjs";

test("accepts string catalogs", () => {
  expect(isStringCatalog({ help: "Help" })).toBe(true);
});

test.each([null, [], { help: 1 }])("rejects invalid string catalogs: %p", (values) => {
  expect(isStringCatalog(values)).toBe(false);
});
