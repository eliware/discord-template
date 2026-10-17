import { validateHelpDefinition } from "../../../../src/commands/validate/help/definition.mjs";
import { helpDefinition as definition } from "../../../../test-fixtures/discord-configuration.mjs";

test("accepts the maintained localized help command", () => {
  expect(validateHelpDefinition(definition)).toEqual([]);
});

test("reports invalid command structure and base fields", () => {
  const invalid = {
    ...definition,
    type: 2,
    name: "",
    description: "",
  };
  const errors = validateHelpDefinition(invalid);
  expect(errors).toContain("type must be 1");
  expect(errors).toContain("name is invalid");
  expect(errors).toContain("description is invalid");
});
