import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/stageInstanceUpdate.mjs";

test("logs the stageInstanceUpdate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "oldStageInstance" };
  const eventValue2 = { marker: "newStageInstance" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("stageInstanceUpdate", {
    oldStageInstance: eventValue1,
    newStageInstance: eventValue2,
  });
});
