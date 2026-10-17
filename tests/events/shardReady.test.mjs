import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/shardReady.mjs";

test("logs the shardReady event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "id" };
  const eventValue2 = { marker: "unavailableGuilds" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("shardReady", {
    id: eventValue1,
    unavailableGuilds: eventValue2,
  });
});
