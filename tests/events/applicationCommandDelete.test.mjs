import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/applicationCommandDelete.mjs";

test("logs the applicationCommandDelete event payload", async () => {
  const log = { debug: jest.fn() };
  const eventArguments = [{ marker: "first" }, { marker: "second" }];
  await handler({ log }, ...eventArguments);
  expect(log.debug).toHaveBeenCalledWith("applicationCommandDelete", { args: eventArguments });
});
