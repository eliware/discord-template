#!/usr/bin/env node
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { createLogger } from "@eliware/log";
import { createDiscord } from "@eliware/discord";
import { startDiscordApplication } from "../src/application.mjs";
import { validateDiscordConfiguration } from "../src/configuration.mjs";
import { loadApplicationEnvironment } from "../src/load-environment.mjs";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
loadApplicationEnvironment(rootDir, dotenv.config);
const { version } = JSON.parse(readFileSync(join(rootDir, "package.json"), "utf8"));
const log = createLogger({ level: process.env.LOG_LEVEL ?? "info" });
await startDiscordApplication({
  createClient: createDiscord,
  log,
  version,
  rootDir,
  validateConfiguration: () =>
    validateDiscordConfiguration(rootDir, process.env, { readFileSync, readdirSync }),
});
