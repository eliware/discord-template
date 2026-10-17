import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/stickerUpdate.mjs";

test("logs the stickerUpdate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "oldSticker" };
  const eventValue2 = { marker: "newSticker" };
  await handler({ log }, eventValue1, eventValue2);
  expect(log.debug).toHaveBeenCalledWith("stickerUpdate", {
    oldSticker: eventValue1,
    newSticker: eventValue2,
  });
});
