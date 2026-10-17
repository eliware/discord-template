import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/roleCreate.mjs";

test("logs the roleCreate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "role" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("roleCreate", { role: eventValue1 });
});
