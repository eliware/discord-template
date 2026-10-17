import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/threadCreate.mjs";

test("logs the threadCreate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "thread" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("threadCreate", { thread: eventValue1 });
});
