import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/messageDelete.mjs";

test("logs the messageDelete event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "message" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("messageDelete", { message: eventValue1 });
});
