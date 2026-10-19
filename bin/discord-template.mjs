#!/usr/bin/env node
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";
import { createLogger } from "@eliware/common";
import { createDiscord } from "@eliware/discord";
import { startDiscordApplication } from "../src/application.mjs";
import { validateDiscordConfiguration } from "../src/configuration.mjs";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const { version } = JSON.parse(readFileSync(join(rootDir, "package.json"), "utf8"));
const log = createLogger({ level: process.env.LOG_LEVEL ?? "info" });
await startDiscordApplication({
  createClient: createDiscord,
  log,
  version,
  validateConfiguration: () =>
    validateDiscordConfiguration(rootDir, process.env, { readFileSync, readdirSync }),
});
