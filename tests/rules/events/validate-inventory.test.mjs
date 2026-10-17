import { discordEvents } from "../../../src/events/discord-events.mjs";
import { validateEventInventory } from "../../../src/rules/events/validate-inventory.mjs";

test("accepts all maintained Discord event adapters", async () => {
  const directory = "/discord-test/events";
  const errors = await validateEventInventory(directory, {
    readDirectory: () => discordEvents.map((name) => `${name}.mjs`),
    loadHandler: async () => ({ default: () => {} }),
  });
  expect(errors).toEqual([]);
});

test("reports missing, unknown, and invalid event adapters", async () => {
  const errors = await validateEventInventory("/discord-test/events", {
    readDirectory: () => ["unknown.mjs"],
    loadHandler: async () => ({ default: null }),
  });
  expect(errors).toContain("missing event: clientReady");
  expect(errors).toContain("unknown event: unknown");
  expect(errors).toContain("invalid event handler: unknown");
});
