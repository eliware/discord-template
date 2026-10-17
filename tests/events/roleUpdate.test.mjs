import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/roleUpdate.mjs";

test("logs the roleUpdate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "oldRole" };
  const eventValue2 = { marker: "newRole" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("roleUpdate", {
    oldRole: eventValue1,
    newRole: eventValue2,
  });
});
