import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/guildMemberRemove.mjs";

test("logs the guildMemberRemove event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "member" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("guildMemberRemove", { member: eventValue1 });
});
