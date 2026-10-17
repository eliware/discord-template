import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/channelUpdate.mjs";

test("logs the channelUpdate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "oldChannel" };
  const eventValue2 = { marker: "newChannel" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("channelUpdate", {
    oldChannel: eventValue1,
    newChannel: eventValue2,
  });
});
