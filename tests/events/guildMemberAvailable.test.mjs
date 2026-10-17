import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/guildMemberAvailable.mjs";

test("logs the guildMemberAvailable event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "member" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("guildMemberAvailable", { member: eventValue1 });
});
