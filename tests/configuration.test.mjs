import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { validateDiscordConfiguration } from "../src/configuration.mjs";

test("accepts the maintained command and locale configuration", () => {
  const root = fileURLToPath(new URL("../", import.meta.url));
  expect(() => validateDiscordConfiguration(root)).not.toThrow();
});

test("reports command and locale configuration errors before startup", () => {
  const directory = mkdtempSync(join(tmpdir(), "discord-config-"));
  try {
    mkdirSync(join(directory, "commands"));
    mkdirSync(join(directory, "locales"));
    writeFileSync(join(directory, "commands", "help.json"), "{}");
    expect(() => validateDiscordConfiguration(directory)).toThrow(/type must be 1/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
