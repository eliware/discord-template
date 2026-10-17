import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/shardDisconnect.mjs";

test("logs the shardDisconnect event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "event" };
  const eventValue2 = { marker: "id" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("shardDisconnect", {
    event: eventValue1,
    id: eventValue2,
  });
});
