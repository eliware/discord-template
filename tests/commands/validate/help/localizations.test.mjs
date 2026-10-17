import { expect, test } from "@jest/globals";
import { validateHelpLocalizations } from "../../../../src/commands/validate/help/localizations.mjs";
import { helpDefinition as definition } from "../../../../test-fixtures/discord-configuration.mjs";

test("reports unsupported localization keys", () => {
  const invalid = {
    ...definition,
    name_localizations: { ...definition.name_localizations, xx: "help" },
    description_localizations: { ...definition.description_localizations, xx: "Help" },
  };
  const errors = validateHelpLocalizations(invalid);

  expect(errors).toContain("unsupported localized locale: xx");
});
