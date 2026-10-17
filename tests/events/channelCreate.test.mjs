import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/channelCreate.mjs";

test("logs the channelCreate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "channel" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("channelCreate", { channel: eventValue1 });
});
