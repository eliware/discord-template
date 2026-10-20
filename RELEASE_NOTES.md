# Release Notes

## 14.0.0 — 2026-10-20

### Changed

- Set the template package version to 14.0.0 and the local directive version to 14.0.
- Update `@eliware/common` and `@eliware/discord` to their latest available releases.
- Configure the logger with `LOG_LEVEL`, which defaults to `info`.
- Use the Discord library current-directory default for command, event, and locale folders.
- Use library signal and process handlers when the app has no other services to stop.
- Call `client.shutdown()` during signal shutdown.
- Validate Discord credentials, help command data, supported locale files, and locale keys before login.
- Inject file system operations into configuration and locale checks for isolated tests.
- Keep command and event adapters in the root discovery folders.
- Keep command and event behavior in focused modules under `src/`.
- Move message command routing to a focused command module.
- Split interaction handler lookup and localized message creation into focused modules.
- Split command definition, localized command name, and description checks into focused validators.
- Split help definition and localization checks into focused validators.
- Split credential, command, and locale configuration checks into focused modules.
- Split locale file discovery, loading, catalog shape, key, and inventory checks into focused modules.
- Pass file system operations to validators and use isolated test fixtures.
- Mirror source modules with focused tests under `tests/`.
- Add tests for localized command names, interaction replies, event eligibility, locale inventories, and configuration failures.
- Remove duplicate message routing coverage and keep integration tests with their workflow.
- Align package guidance, user documentation, and specifications with current conventions.
- Mark template documentation for replacement after scaffolding.
- Use the canonical GHCR workflow to build and publish images with signed attestations.
- Fetch full Git history in CI and use the shared workflow conventions.
- Use the canonical Knit deployment settings.
- Run focused test commands during development.
- Keep tests disconnected from Discord and keep credentials out of Git.
- List supported locale catalogs and document container image access.
- Document the GitHub publication environment and app-owned shutdown pattern.
- Add troubleshooting steps for credentials, slash commands, and the privileged Message Content intent.
- Complete required AGENTS.md sections and remove empty README.md sections.

## 12.0.0 — 2026-10-12

### Changed

- Align package metadata, documentation, and validation with v12 conventions.
- Update the Discord and shared packages to their current major versions.
- Document setup, credentials, commands, events, permissions, locales, and image deployment.
- Keep tests disconnected from Discord.

## 11.0.0 — 2026-10-03

### Changed

- Align repository metadata, documentation, specifications, and workflows with the v11 conventions.
