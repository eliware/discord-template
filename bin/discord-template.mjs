#!/usr/bin/env node
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { createLogger, registerHandlers, registerSignals } from "@eliware/common";
import { createDiscord } from "@eliware/discord";
import { startDiscordApplication } from "../src/application.mjs";
import { createHealthServer } from "../src/health/server.mjs";
import { validateDiscordConfiguration } from "../src/configuration.mjs";
import { loadApplicationEnvironment } from "../src/load-environment.mjs";
import { resolveLogLevel } from "../src/configuration/log-level.mjs";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
loadApplicationEnvironment(rootDir, dotenv.config);
const { version } = JSON.parse(readFileSync(join(rootDir, "package.json"), "utf8"));
const log = createLogger({ level: resolveLogLevel(process.env.LOG_LEVEL) });
await startDiscordApplication({
  createClient: createDiscord,
  createHealthServer,
  log,
  registerHandlers,
  registerSignals,
  version,
  rootDir,
  validateConfiguration: () =>
    validateDiscordConfiguration(rootDir, process.env, { readFileSync, readdirSync }),
});
