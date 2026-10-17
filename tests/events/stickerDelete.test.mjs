import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/stickerDelete.mjs";

test("logs the stickerDelete event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "sticker" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("stickerDelete", { sticker: eventValue1 });
});
