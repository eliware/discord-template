import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/inviteCreate.mjs";

test("logs the inviteCreate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "invite" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("inviteCreate", { invite: eventValue1 });
});
