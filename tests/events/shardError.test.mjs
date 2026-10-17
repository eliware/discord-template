import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/shardError.mjs";

test("logs the shardError event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "error" };
  const eventValue2 = { marker: "shardId" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("shardError", {
    error: eventValue1,
    shardId: eventValue2,
  });
});
