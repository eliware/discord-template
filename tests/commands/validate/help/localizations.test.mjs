import { expect, test } from "@jest/globals";
import { validateHelpLocalizations } from "../../../../src/commands/validate/help/localizations.mjs";
import { helpDefinition as definition } from "../../../../test-fixtures/discord-configuration.mjs";

test("reports invalid and unsupported localized fields", () => {
  const invalid = {
    ...definition,
    name_localizations: { ...definition.name_localizations, xx: "help", bg: "Hilfe" },
    description_localizations: {
      ...definition.description_localizations,
      xx: "Help",
      bg: "",
    },
  };
  const errors = validateHelpLocalizations(invalid);

  expect(errors).toContain("unsupported localized locale: xx");
  expect(errors).toContain("localized name is missing or invalid: bg");
  expect(errors).toContain("localized description is missing or invalid: bg");
});
