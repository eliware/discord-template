# Release Notes

## 9.0.0 — 2026-09-30

### Changed

- Rebuilt the starter as a Node.js 26 Discord application aligned with the Eliware v9 profiles.
- Moved command and event implementations under `src/` with mirrored tests while preserving root discovery adapters.
- Added pre-startup validation for command definitions and locale catalogs, standard CI, GHCR publication, and Knit configuration.
- Removed stale application scaffolding, service and example files, and authority metadata.
