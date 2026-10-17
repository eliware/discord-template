import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/presenceUpdate.mjs";

test("logs the presenceUpdate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "oldPresence" };
  const eventValue2 = { marker: "newPresence" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("presenceUpdate", {
    oldPresence: eventValue1,
    newPresence: eventValue2,
  });
});
