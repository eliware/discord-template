import { expect, jest, test } from "@jest/globals";
import handler from "../../src/events/guildMembersChunk.mjs";

test("logs the guildMembersChunk event payload", async () => {
  const log = { debug: jest.fn() };
  const eventValue1 = { marker: "members" };
  const eventValue2 = { marker: "guild" };
  const eventValue3 = { marker: "chunk" };
  await handler({ log }, eventValue1, eventValue2, eventValue3);
  expect(log.debug).toHaveBeenCalledWith("guildMembersChunk", {
    members: eventValue1,
    guild: eventValue2,
    chunk: eventValue3,
  });
});
