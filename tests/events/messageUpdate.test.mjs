import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/messageUpdate.mjs";

test("logs the messageUpdate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "oldMessage" };
  const eventValue2 = { marker: "newMessage" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("messageUpdate", {
    oldMessage: eventValue1,
    newMessage: eventValue2,
  });
});
