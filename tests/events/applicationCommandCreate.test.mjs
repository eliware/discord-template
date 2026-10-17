import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/applicationCommandCreate.mjs";

test("logs the applicationCommandCreate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventArguments = [{ marker: "first" }, { marker: "second" }];
  await handler({ log }, ...eventArguments);
  expect(log.debug).toHaveBeenCalledWith("applicationCommandCreate", { args: eventArguments });
});
