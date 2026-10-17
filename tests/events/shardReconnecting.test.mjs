import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/shardReconnecting.mjs";

test("logs the shardReconnecting event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "id" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("shardReconnecting", { id: eventValue1 });
});
