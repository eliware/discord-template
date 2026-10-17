import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/messageDeleteBulk.mjs";

test("logs the messageDeleteBulk event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "messages" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("messageDeleteBulk", { messages: eventValue1 });
});
