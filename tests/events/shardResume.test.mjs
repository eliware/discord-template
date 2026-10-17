import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/shardResume.mjs";

test("logs the shardResume event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "id" };
  const eventValue2 = { marker: "replayedEvents" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("shardResume", {
    id: eventValue1,
    replayedEvents: eventValue2,
  });
});
