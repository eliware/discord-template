import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/threadUpdate.mjs";

test("logs the threadUpdate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "oldThread" };
  const eventValue2 = { marker: "newThread" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("threadUpdate", {
    oldThread: eventValue1,
    newThread: eventValue2,
  });
});
