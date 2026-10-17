import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/stageInstanceCreate.mjs";

test("logs the stageInstanceCreate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "stageInstance" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("stageInstanceCreate", { stageInstance: eventValue1 });
});
