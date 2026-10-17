import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/guildMemberUpdate.mjs";

test("logs the guildMemberUpdate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "oldMember" };
  const eventValue2 = { marker: "newMember" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("guildMemberUpdate", {
    oldMember: eventValue1,
    newMember: eventValue2,
  });
});
