#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { addMessageKey } from "../src/locales/add-message-key.mjs";

const [key, ...messageParts] = process.argv.slice(2);
const message = messageParts.join(" ");
if (!key || !message) {
  throw new Error('Usage: npm run locale:add -- <key> "<English message>"');
}

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const updated = addMessageKey(join(rootDir, "locales"), key, message, {
  readdirSync,
  readFileSync,
  writeFileSync,
});
console.info(`Added the message key to ${updated} locale catalogs.`);
