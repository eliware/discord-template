import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/guildIntegrationsUpdate.mjs";

test("logs the guildIntegrationsUpdate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "guild" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("guildIntegrationsUpdate", { guild: eventValue1 });
});
