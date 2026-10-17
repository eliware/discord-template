import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/guildUpdate.mjs";

test("logs the guildUpdate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "oldGuild" };
  const eventValue2 = { marker: "newGuild" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("guildUpdate", {
    oldGuild: eventValue1,
    newGuild: eventValue2,
  });
});
