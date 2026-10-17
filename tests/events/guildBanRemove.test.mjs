import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/guildBanRemove.mjs";

test("logs the guildBanRemove event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "ban" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("guildBanRemove", { ban: eventValue1 });
});
