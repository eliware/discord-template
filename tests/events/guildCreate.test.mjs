import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/guildCreate.mjs";

test("logs the guildCreate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "guild" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("guildCreate", { guild: eventValue1 });
});
