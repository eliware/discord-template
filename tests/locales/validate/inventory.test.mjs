import { expect, test } from "@jest/globals";
import { validateLocaleInventory } from "../../../src/locales/validate/inventory.mjs";

test("reports missing and unsupported locale files", () => {
  const errors = validateLocaleInventory(["en-US.json", "xx.json"]);

  expect(errors).toContain("unsupported locale: xx");
  expect(errors).toContain("missing locale: fr");
});
