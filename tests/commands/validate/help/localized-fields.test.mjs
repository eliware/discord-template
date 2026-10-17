import { expect, test } from "@jest/globals";
import { validateLocalizedHelpFields } from "../../../../src/commands/validate/help/localized-fields.mjs";
import { helpDefinition as definition } from "../../../../test-fixtures/discord-configuration.mjs";

test("reports missing or invalid localized values", () => {
  const invalid = {
    ...definition,
    name_localizations: { ...definition.name_localizations, bg: "Hilfe" },
    description_localizations: { ...definition.description_localizations, bg: "" },
  };
  const errors = validateLocalizedHelpFields(invalid);

  expect(errors).toContain("localized name is missing or invalid: bg");
  expect(errors).toContain("localized description is missing or invalid: bg");
});
