import { expect, test } from "@jest/globals";
import { resolveLogLevel, supportedLogLevels } from "../../src/configuration/log-level.mjs";

test("defaults to info when LOG_LEVEL is not set", () => {
  expect(resolveLogLevel(undefined)).toBe("info");
});

test.each(supportedLogLevels)("accepts the %s log level", (level) => {
  expect(resolveLogLevel(level)).toBe(level);
});

test("rejects a log level outside the documented options", () => {
  expect(() => resolveLogLevel("trace")).toThrow(
    "LOG_LEVEL must be one of: error, warn, info, http, verbose, debug, silly.",
  );
});
