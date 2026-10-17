import { validateHelpDefinition } from "../../src/commands/validate-help-definition.mjs";
import { helpDefinition as definition } from "../../test-fixtures/discord-configuration.mjs";

test("accepts the maintained localized help command", () => {
  expect(validateHelpDefinition(definition)).toEqual([]);
});

test("reports invalid command and localized fields", () => {
  const invalid = {
    ...definition,
    type: 2,
    name: "Invalid Name",
    description: "x".repeat(101),
    name_localizations: {},
    description_localizations: { ...definition.description_localizations, bg: "" },
  };
  const errors = validateHelpDefinition(invalid);
  expect(errors).toContain("type must be 1");
  expect(errors).toContain("name is invalid");
  expect(errors).toContain("description is invalid");
  expect(errors).toContain("localized name is missing or invalid: bg");
  expect(errors).toContain("localized description is missing or invalid: bg");
});

test("rejects unsupported localized locales", () => {
  const invalid = {
    ...definition,
    name_localizations: { ...definition.name_localizations, xx: "help" },
    description_localizations: { ...definition.description_localizations, xx: "Help" },
  };
  expect(validateHelpDefinition(invalid)).toContain("unsupported localized locale: xx");
});
