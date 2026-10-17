import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/error.mjs";

test("logs the error event payload", async () => {
  const log = { error: jest.fn() };
  const eventValue1 = { marker: "error" };
  await handler({ log }, eventValue1);
  expect(log.error).toHaveBeenCalledWith("error", { error: eventValue1 });
});
