import { jest, expect, test } from "@jest/globals";
import handler from "../../src/events/shardResume.mjs";

test("shardResume handler stub", async () => {
  const log = { debug: jest.fn(), info: jest.fn(), error: jest.fn(), warn: jest.fn() };
  await expect(handler({ log })).resolves.toBeUndefined();
});
