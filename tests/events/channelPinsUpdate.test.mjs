import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/channelPinsUpdate.mjs";

test("logs the channelPinsUpdate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "channel" };
  const eventValue2 = { marker: "time" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("channelPinsUpdate", {
    channel: eventValue1,
    time: eventValue2,
  });
});
