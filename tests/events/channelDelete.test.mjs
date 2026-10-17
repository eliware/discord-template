import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/channelDelete.mjs";

test("logs the channelDelete event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "channel" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("channelDelete", { channel: eventValue1 });
});
