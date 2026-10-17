import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/threadMemberUpdate.mjs";

test("logs the threadMemberUpdate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "oldMember" };
  const eventValue2 = { marker: "newMember" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("threadMemberUpdate", {
    oldMember: eventValue1,
    newMember: eventValue2,
  });
});
