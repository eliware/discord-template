import { jest, expect, test } from "@jest/globals";
import handler from "../../src/commands/help.mjs";

test("replies with localized help text ephemerally", async () => {
  const log = { debug: jest.fn() };
  const msg = jest.fn(() => "Help response");
  const interaction = { reply: jest.fn() };
  await handler({ log, msg }, interaction);
  expect(msg).toHaveBeenCalledWith("help", "This is the default help text.");
  expect(interaction.reply).toHaveBeenCalledWith({ content: "Help response", flags: 1 << 6 });
  expect(log.debug).toHaveBeenCalledTimes(2);
});
