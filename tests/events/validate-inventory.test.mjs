import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { validateEventInventory } from "../../src/events/validate-inventory.mjs";

test("accepts all maintained Discord event adapters", async () => {
  const errors = await validateEventInventory(
    fileURLToPath(new URL("../../events/", import.meta.url)),
  );
  expect(errors).toEqual([]);
});

test("reports missing, unknown, and invalid event adapters", async () => {
  const directory = mkdtempSync(join(tmpdir(), "discord-events-"));
  try {
    writeFileSync(join(directory, "unknown.mjs"), "export default null;\n");
    const errors = await validateEventInventory(directory);
    expect(errors).toContain("missing event: clientReady");
    expect(errors).toContain("unknown event: unknown");
    expect(errors).toContain("invalid event handler: unknown");
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
