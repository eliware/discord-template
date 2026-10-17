import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/guildUnavailable.mjs";

test("logs the guildUnavailable event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "guild" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("guildUnavailable", { guild: eventValue1 });
});
