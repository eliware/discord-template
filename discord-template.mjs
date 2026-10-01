#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { discordDependencies, startDiscordApplication } from "./src/application.mjs";
import { validateDiscordConfiguration } from "./src/configuration.mjs";

const rootDir = dirname(fileURLToPath(import.meta.url));
const { version } = JSON.parse(readFileSync(join(rootDir, "package.json"), "utf8"));
await startDiscordApplication({
  ...discordDependencies,
  rootDir,
  version,
  validateConfiguration: () => validateDiscordConfiguration(rootDir),
});
