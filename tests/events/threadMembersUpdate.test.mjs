import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/threadMembersUpdate.mjs";

test("logs the threadMembersUpdate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "addedMembers" };
  const eventValue2 = { marker: "removedMembers" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("threadMembersUpdate", {
    addedMembers: eventValue1,
    removedMembers: eventValue2,
  });
});
