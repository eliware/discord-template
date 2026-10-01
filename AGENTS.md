# AGENTS.md

## Project

Repository: `eliware/discord-template`. Purpose: provide a reusable Discord application template.

## Scope and boundaries

Scope: this repository owns the Discord starter application, its commands, events, locale data, tests, metadata, documentation, and container definition. Important boundaries: it excludes shared Eliware requirements, credentials, and production release and deployment execution. This AGENTS.md applies repository-wide. Any nearer AGENTS.md applies within its subdirectory.

## Layout

Required structure: `discord-template.mjs` is the executable entrypoint. `src/` contains application implementation and `tests/` mirrors it. The root `commands/` and `events/` directories contain discovery adapters required by `@eliware/discord`; `locales/` contains the supported message catalogs. `docs/` and `specs/` contain user documentation and repository directives. `.knit/deploy.yaml` defines development validation.

## Development

Use Node.js 26, npm, and native ESM `.mjs` modules. Runtime environment configuration uses `.env`; package metadata is not runtime configuration. This guidance applies repository-wide; nearer AGENTS.md instructions apply to their subdirectories. Read README.md, applicable specifications, implementation, and tests before changing behavior. Every source and test module must have one single responsibility: one cohesive purpose and one reason to change. Business-logic modules and coordinators are valid, including coordinators of coordinators, when each module has one distinct responsibility. When a change introduces a distinct responsibility, create a focused submodule with a mirrored test and wire it through its owner; do not add the new responsibility to an existing module. Refactor them when mixed responsibilities are found during ordinary review. The 100-line source and 200-line test maxima are blocking; passing them does not prove cohesion or permit mixed responsibilities.

Keep every `.mjs` under `src/` mirrored by exactly one `.test.mjs` under `tests/`; every test file must map to a source file. Place command and event implementations under `src/`; retain the root adapters so `@eliware/discord` can discover them. Place application-specific tests at the lowest module level that proves their behavior.

## Validation

Use Node.js 26 with npm. Run `npm ci` after dependency changes and `npm test` before handoff. Aggregate validation runs Jest with 100% statement, branch, function, and line coverage, lint, format-check, audit, and applicable profile checks through `eliware-test`. CI runs `npm ci` followed by `npm test`. Do not launch a live Discord client for validation.

## Security

Keep `.env`, credentials, tokens, private keys, and machine-specific files out of version control and container images. Store runtime secrets in an untracked `.env` file or an authorized secret store. Do not log secrets or sensitive payloads. Grant the bot only the intents and Discord permissions its maintained features require.

## Changes

Keep changes actionable, current, and concise. Project-specific instructions may add requirements without weakening shared requirements. A documented deviation does not waive any convention ID or validation stage. Do not publish, release, deploy, or modify external systems without explicit authorization through the applicable Operations handoff. A GHCR release handoff does not authorize deployment; any rollout requires a separate GitOps handoff.

## Application

The runtime entrypoint is `discord-template.mjs`; it loads `.env` and delegates startup to `src/application.mjs`. Startup validates the command definition and locale catalog before connecting. `DISCORD_CLIENT_ID` and `DISCORD_TOKEN` are required; `LOG_LEVEL` defaults to `info`. Shutdown awaits client destruction. The application connects to Discord and exposes command interactions; its safe operational boundary is limited to the documented intents and bot permissions. Package metadata and `.knit/deploy.yaml` are not runtime configuration.

## Discord

The starter provides the localized `/help` command. The client enables Guilds and GuildMessages intents; MessageContent, GuildMembers, GuildPresences, and GuildVoiceStates are disabled. The help command requests channel viewing and message sending. Command implementations live under `src/commands/`, event implementations under `src/events/`, and discovery adapters remain in the root `commands/` and `events/` directories. Keep all 32 supported locale catalogs aligned with `locales/en-US.json`. Validate behavior with `npm test`; do not run live command registration as part of local validation.

## GHCR publication

The public image is `ghcr.io/eliware/discord-template`, built from the repository-root Dockerfile and context. Its visibility is public after publication. `.github/workflows/publish.yml` publishes version-tagged images after validation, creates a signed GitHub artifact attestation as provenance, and verifies the exact image digest. Workflow credentials come from GitHub's token. Publication does not deploy the bot. Require the Operations release handoff to publish and a separate GitOps deployment handoff for any rollout.
