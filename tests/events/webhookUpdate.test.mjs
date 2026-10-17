import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/webhookUpdate.mjs";

test("logs the webhookUpdate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "channel" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("webhookUpdate", { channel: eventValue1 });
});
