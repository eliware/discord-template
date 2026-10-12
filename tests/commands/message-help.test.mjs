import { expect, jest, test } from "@jest/globals";
import messageHelp from "../../src/commands/message-help.mjs";

for (const [name, guild, locale] of [
  ["guild locale", { preferredLocale: "fr" }, "fr"],
  ["default locale", undefined, "en-US"],
]) {
  test(`uses the ${name} for message help`, async () => {
    const log = { debug: jest.fn() };
    const msg = jest.fn(() => "help response");
    const message = { guild, reply: jest.fn() };

    await messageHelp({ log, msg }, message);

    expect(msg).toHaveBeenCalledWith(locale, "help", "This is the help text.");
    expect(message.reply).toHaveBeenCalledWith("help response");
    expect(log.debug).toHaveBeenCalledWith("!help Response", { response: "help response" });
  });
}
