import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/rateLimit.mjs";

test("logs the rateLimit event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "rateLimitData" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("rateLimit", { rateLimitData: eventValue1 });
});
