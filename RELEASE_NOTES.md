# Release Notes

## Unreleased

### Changed

- Continue maintaining the template under v11 conventions; this working package version does not assert registry publication.

## 11.0.0 — 2026-10-03

### Changed

- Align repository metadata, documentation, specifications, and workflows with the v11 conventions.

## 10.0.0 — 2026-10-02

### Changed

- Align the template metadata, branding, documentation links, and structured specifications with the v10 repository conventions.
- Record package version 10.0.0 as an unpublished candidate pending the Eliware Test v10 package release.

## 9.0.0 — 2026-09-30

### Changed

- Rebuilt the starter as a Node.js 26 Discord application aligned with the Eliware v9 profiles.
- Moved command and event implementations under `src/` with mirrored tests while preserving root discovery adapters.
- Added pre-startup validation for command definitions and locale catalogs, standard CI, GHCR publication, and Knit configuration.
- Removed stale application scaffolding, service and example files, and authority metadata.
