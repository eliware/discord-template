import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/stickerCreate.mjs";

test("logs the stickerCreate event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "sticker" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("stickerCreate", { sticker: eventValue1 });
});
