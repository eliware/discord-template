import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/guildDelete.mjs";

test("logs the guildDelete event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "guild" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("guildDelete", { guild: eventValue1 });
});
