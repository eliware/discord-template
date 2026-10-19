import { expect, test } from "@jest/globals";
import { validateSupportedHelpLocalizationKeys } from "../../../../src/commands/validate/help/localization-keys.mjs";
import { helpDefinition as definition } from "../../../../test-fixtures/discord-configuration.mjs";

test.each(["name_localizations", "description_localizations"])(
  "reports unsupported keys in %s",
  (field) => {
    const invalid = {
      ...definition,
      [field]: { ...definition[field], xx: "help" },
    };

    expect(validateSupportedHelpLocalizationKeys(invalid)).toEqual([
      "unsupported localized locale: xx",
    ]);
  },
);
