import { supportedLocales } from "../../src/locales/supported-locales.mjs";

test("declares unique locale identifiers", () => {
  expect(supportedLocales).toHaveLength(32);
  expect(new Set(supportedLocales).size).toBe(supportedLocales.length);
  expect(supportedLocales).toContain("en-US");
});
