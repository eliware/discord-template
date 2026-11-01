import { expect, jest, test } from "@jest/globals";
import { createHealthServer } from "../../src/health/server.mjs";

async function withLocalFetch(callback) {
  const originalFetch = globalThis.fetch;
  const fetchSpy = jest
    .spyOn(globalThis, "fetch")
    .mockImplementation((...args) => originalFetch(...args));
  try {
    await callback();
  } finally {
    fetchSpy.mockRestore();
  }
}

async function request(server, path, method = "GET") {
  const { port } = server.address();
  return fetch(`http://127.0.0.1:${port}${path}`, { method });
}

test("serves health and stays unavailable until readiness changes", async () => {
  const health = createHealthServer({ host: "127.0.0.1", port: 0 });
  await health.start();
  try {
    await withLocalFetch(async () => {
      const healthResponse = await request(health, "/health?check=live");
      expect(healthResponse.status).toBe(200);
      await expect(healthResponse.json()).resolves.toEqual({ status: "ok" });

      const pendingResponse = await request(health, "/ready");
      expect(pendingResponse.status).toBe(503);
      await expect(pendingResponse.json()).resolves.toEqual({ status: "not ready" });

      health.setReady(true);
      const readyResponse = await request(health, "/ready");
      expect(readyResponse.status).toBe(200);
      await expect(readyResponse.json()).resolves.toEqual({ status: "ready" });

      health.setReady(false);
      expect((await request(health, "/ready")).status).toBe(503);
    });
  } finally {
    await health.close();
  }
});

test("returns 404 for unknown paths and 405 for unsupported methods", async () => {
  const health = createHealthServer({ host: "127.0.0.1", port: 0 });
  await health.start();
  try {
    await withLocalFetch(async () => {
      expect((await request(health, "/unknown")).status).toBe(404);
      const response = await request(health, "/health", "POST");
      expect(response.status).toBe(405);
      expect(response.headers.get("allow")).toBe("GET");
    });
  } finally {
    await health.close();
  }
});

test("closes safely before listening and repeats close calls", async () => {
  const health = createHealthServer();
  await health.close();
  await health.close();
  expect(health.address()).toBeNull();
});

test("reports server close errors", async () => {
  const server = {
    listening: true,
    close: (callback) => callback(new Error("close failed")),
  };
  const health = createHealthServer({ serverFactory: () => server });
  await expect(health.close()).rejects.toThrow("close failed");
});

test("rejects a listener when another server uses the port", async () => {
  const active = createHealthServer({ host: "127.0.0.1", port: 0 });
  await active.start();
  const conflicting = createHealthServer({ host: "127.0.0.1", port: active.address().port });
  try {
    await expect(conflicting.start()).rejects.toThrow();
  } finally {
    await conflicting.close();
    await active.close();
  }
});
