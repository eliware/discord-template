import { jest, expect, test } from "@jest/globals";
import handler from "../../src/events/clientReady.mjs";

test("logs readiness and applies configured presence", async () => {
  const log = { debug: jest.fn(), info: jest.fn() };
  const client = { user: { tag: "test#0001", setPresence: jest.fn() } };
  await expect(handler({ log, presence: { status: "online" } }, client)).resolves.toBeUndefined();
  expect(log.info).toHaveBeenCalledWith("Logged in as test#0001");
  expect(client.user.setPresence).toHaveBeenCalledWith({ status: "online" });
});

test("does not set presence when none is configured", async () => {
  const client = { user: { tag: "test#0001", setPresence: jest.fn() } };
  await handler({ log: { debug: jest.fn(), info: jest.fn() } }, client);
  expect(client.user.setPresence).not.toHaveBeenCalled();
});
