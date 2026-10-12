import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { validateLocaleDirectory } from "../../src/locales/validate-directory.mjs";

test("accepts the maintained locale catalog", () => {
  const directory = fileURLToPath(new URL("../../locales/", import.meta.url));
  expect(validateLocaleDirectory(directory)).toEqual([]);
});

test("reports missing, unsupported, malformed, and mismatched locale data", () => {
  const directory = mkdtempSync(join(tmpdir(), "discord-locales-"));
  try {
    writeFileSync(join(directory, "en-US.json"), JSON.stringify({ help: "Help" }));
    writeFileSync(join(directory, "fr.json"), JSON.stringify({ help: "Aide", extra: "x" }));
    writeFileSync(join(directory, "xx.json"), JSON.stringify({ help: "Help" }));
    writeFileSync(join(directory, "bad.json"), "{");
    const errors = validateLocaleDirectory(directory);
    expect(errors).toContain("missing locale: bg");
    expect(errors).toContain("unsupported locale: xx");
    expect(errors).toContain("invalid JSON: bad.json");
    expect(errors).toContain("locale keys differ: fr.json");
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("reports a missing base locale without comparing translated keys", () => {
  const directory = mkdtempSync(join(tmpdir(), "discord-locales-base-"));
  try {
    writeFileSync(join(directory, "fr.json"), JSON.stringify({ help: "Aide" }));
    const errors = validateLocaleDirectory(directory);
    expect(errors).toContain("invalid or missing base locale: en-US.json");
    expect(errors).not.toContain("locale keys differ: fr.json");
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("rejects a base locale that is not an object", () => {
  const directory = mkdtempSync(join(tmpdir(), "discord-locales-invalid-base-"));
  try {
    writeFileSync(join(directory, "en-US.json"), "[]");
    writeFileSync(join(directory, "fr.json"), JSON.stringify({ help: "Aide" }));
    const errors = validateLocaleDirectory(directory);
    expect(errors).toContain("invalid or missing base locale: en-US.json");
    expect(errors).not.toContain("locale keys differ: fr.json");
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("keeps the en-GB help message in English", () => {
  const enGb = JSON.parse(readFileSync(new URL("../../locales/en-GB.json", import.meta.url)));
  const enUs = JSON.parse(readFileSync(new URL("../../locales/en-US.json", import.meta.url)));
  expect(enGb.help).toBe(enUs.help);
});
