import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/applicationCommandUpdate.mjs";

test("logs the applicationCommandUpdate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventArguments = [{ marker: "first" }, { marker: "second" }];
  await handler({ log }, ...eventArguments);
  expect(log.debug).toHaveBeenCalledWith("applicationCommandUpdate", { args: eventArguments });
});
