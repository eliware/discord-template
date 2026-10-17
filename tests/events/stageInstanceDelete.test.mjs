import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/stageInstanceDelete.mjs";

test("logs the stageInstanceDelete event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "stageInstance" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("stageInstanceDelete", { stageInstance: eventValue1 });
});
