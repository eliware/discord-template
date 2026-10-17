import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/debug.mjs";

test("logs the debug event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "debug" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("debug", { debug: eventValue1 });
});
