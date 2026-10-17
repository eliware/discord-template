import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/voiceStateUpdate.mjs";

test("logs the voiceStateUpdate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "oldState" };
  const eventValue2 = { marker: "newState" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("voiceStateUpdate", {
    oldState: eventValue1,
    newState: eventValue2,
  });
});
