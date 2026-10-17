import { expect, jest, test } from "@jest/globals";
import { createLocalizedMessage } from "../../src/interactions/create-localized-message.mjs";

test.each([
  [{ locale: "fr", guildLocale: "de", guild: { preferredLocale: "es" } }, "fr"],
  [{ guildLocale: "de", guild: { preferredLocale: "es" } }, "de"],
  [{ guild: { preferredLocale: "es" } }, "es"],
  [{}, "en-US"],
])("uses the selected locale %s", (interaction, locale) => {
  const log = {};
  const msg = jest.fn(() => "localized");
  const localizedMessage = createLocalizedMessage(interaction, msg, log);

  expect(localizedMessage("help", "Help")).toBe("localized");
  expect(msg).toHaveBeenCalledWith(locale, "help", "Help", log);
});
