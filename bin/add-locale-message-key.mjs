#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { addMessageKey } from "../src/locales/add-message-key.mjs";
import { parseMessageKeyArguments } from "../src/locales/message-key-arguments.mjs";

const { key, message } = parseMessageKeyArguments(process.argv.slice(2));

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const updated = addMessageKey(join(rootDir, "locales"), key, message, {
  readdirSync,
  readFileSync,
  writeFileSync,
});
console.info(`Added the message key to ${updated} locale catalogs.`);
