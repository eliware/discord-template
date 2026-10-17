import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/guildBanAdd.mjs";

test("logs the guildBanAdd event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "ban" };
  await handler({ log }, eventValue1);
  expect(log.debug).toHaveBeenCalledWith("guildBanAdd", { ban: eventValue1 });
});
