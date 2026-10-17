import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/warn.mjs";

test("logs the warn event payload", async () => {
  const log = { warn: jest.fn() };
  const eventValue1 = { marker: "warn" };
  await handler({ log }, eventValue1);
  expect(log.warn).toHaveBeenCalledWith("warn", { warn: eventValue1 });
});
