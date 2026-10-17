import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/invalidated.mjs";

test("logs the invalidated event payload", async () => {
  const log = { debug: jest.fn() };

  await handler({ log });
  expect(log.debug).toHaveBeenCalledWith("invalidated");
});
