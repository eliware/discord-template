import { jest, expect, test } from "@jest/globals";
import { join } from "node:path";
import { loadApplicationEnvironment } from "../src/load-environment.mjs";

test("loads credentials from the resolved app root", () => {
  const configureEnvironment = jest.fn();
  loadApplicationEnvironment("C:/app", configureEnvironment);
  expect(configureEnvironment).toHaveBeenCalledWith({ path: join("C:/app", ".env") });
});
