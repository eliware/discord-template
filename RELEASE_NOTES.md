# Release Notes

## 15.0.1 — 2026-10-26

### Changed

- Update the template package to version 15.0.1.
- Update `@eliware/common`, `@eliware/discord`, and `@eliware/test` to version 15.0.1 and refresh the locked dependency tree.
- Validate every supported locale catalog before writing any catalog when adding a message key.
- Update the GHCR pull command in `AGENTS.md` to use the 15.0.1 image tag.

## 15.0.0 — 2026-10-25

### Added

- Add an `npm start` command for the starter application.
- Load `.env` from the resolved repository root and use that root for validation and Discord file discovery.
- Add a locale command that marks untranslated messages, preserves valid translations, and repairs empty or non-string values.
- Add a private localized reply to the `/help` command.
- Validate `LOG_LEVEL` and require a test server ID and permission confirmation before startup.
- Add focused tests for app root selection, slash command routing, locale updates, and required event adapters.
- Document Discord setup, bot access, startup, shutdown, locale updates, container use, and troubleshooting.
- Document image visibility, pull access, test targets, and server permission requirements as setup values.

### Changed

- Set the template package version to 15.0.0 and the local directive version to 15.0.
- Update `@eliware/discord`, `@eliware/common`, and `@eliware/test` to version 15.
- Update `discord.js` and `dotenv` to current compatible releases.
- Use shared logging utilities from `@eliware/common`.
- Use the supported `MessageFlags.Ephemeral` constant for private replies.
- Enable only the Guilds intent in the default app.
- Keep `clientReady` and `interactionCreate` as the default event adapters.
- Remove the default message handler and event placeholders that the starter does not use.
- Keep event adapters in `events/` and event behavior in matching `src/events/` modules.
- Refine command, credential, locale, and event inventory validation into focused modules.
- Use the same locale keys in supported catalogs. Skip unsupported catalogs when adding a key.
- Replace empty or non-string values for the requested locale key.
- Use the canonical GitHub Container Registry workflow and current shared validation workflow.
- Align repository guidance, specifications, release notes, and user documentation with v15 conventions.
- Keep tests isolated from Discord and credentials.

## 12.0.0 — 2026-10-12

### Changed

- Align package metadata, documentation, and validation with v12 conventions.
- Update the Discord and shared packages to their current major versions.
- Document setup, credentials, commands, events, permissions, locales, and image deployment.
- Keep tests disconnected from Discord.

## 11.0.0 — 2026-10-03

### Changed

- Align repository metadata, documentation, specifications, and workflows with the v11 conventions.
