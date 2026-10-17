import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/threadDelete.mjs";

test("logs the threadDelete event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "thread" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("threadDelete", { thread: eventValue1 });
});
