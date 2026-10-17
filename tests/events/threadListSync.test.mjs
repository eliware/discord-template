import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/threadListSync.mjs";

test("logs the threadListSync event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "threads" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("threadListSync", { threads: eventValue1 });
});
