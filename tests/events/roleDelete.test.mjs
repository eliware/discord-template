import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/roleDelete.mjs";

test("logs the roleDelete event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "role" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("roleDelete", { role: eventValue1 });
});
