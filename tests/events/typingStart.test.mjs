import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/typingStart.mjs";

test("logs the typingStart event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "typing" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("typingStart", { typing: eventValue1 });
});
