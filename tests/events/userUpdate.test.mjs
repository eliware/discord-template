import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/userUpdate.mjs";

test("logs the userUpdate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "oldUser" };
  const eventValue2 = { marker: "newUser" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("userUpdate", {
    oldUser: eventValue1,
    newUser: eventValue2,
  });
});
