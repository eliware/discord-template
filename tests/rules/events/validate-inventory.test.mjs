import { expect, test } from "@jest/globals";
import { validateEventInventory } from "../../../src/rules/events/validate-inventory.mjs";

function readDirectory(directory) {
  return {
    "/events": ["clientReady.mjs", "interactionCreate.mjs"],
    "/src/events": ["clientReady.mjs", "interactionCreate.mjs"],
  }[directory];
}

test("accepts only the required event adapters and matching source modules", () => {
  expect(
    validateEventInventory("/events", { readDirectory, sourceDirectory: "/src/events" }),
  ).toEqual([]);
});

test("reports missing required adapters and source modules", () => {
  expect(
    validateEventInventory("/events", {
      readDirectory: () => [],
      sourceDirectory: "/src/events",
    }),
  ).toEqual([
    "missing event adapter: clientReady",
    "missing event adapter: interactionCreate",
    "missing event handler: clientReady",
    "missing event handler: interactionCreate",
  ]);
});

test("reports adapters and source modules without matching files", () => {
  const errors = validateEventInventory("/events", {
    readDirectory: (directory) =>
      directory === "/events" ? ["clientReady.mjs"] : ["interactionCreate.mjs"],
    sourceDirectory: "/src/events",
  });
  expect(errors).toEqual([
    "missing event adapter: interactionCreate",
    "missing event handler: clientReady",
  ]);
});

test("reports an optional adapter without source code", () => {
  const errors = validateEventInventory("/events", {
    readDirectory: (directory) =>
      directory === "/events"
        ? ["clientReady.mjs", "interactionCreate.mjs", "messageCreate.mjs"]
        : ["clientReady.mjs", "interactionCreate.mjs"],
    sourceDirectory: "/src/events",
  });
  expect(errors).toEqual(["missing event handler: messageCreate"]);
});

test("reports optional source code without an adapter", () => {
  const errors = validateEventInventory("/events", {
    readDirectory: (directory) =>
      directory === "/events"
        ? ["clientReady.mjs", "interactionCreate.mjs"]
        : ["clientReady.mjs", "interactionCreate.mjs", "messageCreate.mjs"],
    sourceDirectory: "/src/events",
  });
  expect(errors).toEqual(["missing event adapter: messageCreate"]);
});
