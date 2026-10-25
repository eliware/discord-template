# AGENTS.md

## Project

See README.md for repository purpose, ownership, and scope.

## Scope and boundaries

Keep requirements in their authoritative specifications.

## Layout

Use README.md and specs/README.md to find maintained files.

## Development

Give each source and test module one cohesive purpose.

## Validation

Use Node.js 26 or later and native ESM for maintained JavaScript modules.
Run npm test for aggregate validation.
Run npm run lint for lint checks.
Run npm run audit for dependency checks.
Run npm run format to format files.
Run npm run format:check to check formatting.

## Security

Keep credentials, secret values, private data, and runtime state out of Git.

## Changes

Keep each document in the repository that owns its content. Update its nearest index when you add a document.

## Application

Run focused tests first during development.
Run one test file with `npm test -- tests/path/to/example.test.mjs`.
Run multiple test files with `npm test -- tests/path/to/first.test.mjs tests/path/to/second.test.mjs`.
Prevent repeated full-suite runs during development.
Run the full `npm test` suite for final validation before a commit, milestone, or release.

## Discord

Keep command and event logic in src/. Keep the root commands/ and events/ folders as discovery adapters.

## GHCR publication

Image: ghcr.io/eliware/discord-template

Pull command: docker pull ghcr.io/eliware/discord-template:v15.0.0

Supported tags: vMAJOR.MINOR.PATCH

Image visibility: [public or private before publication]

Accounts with pull access: [list users and teams, or state that anyone can pull a public image]

Publisher access: GITHUB_TOKEN with packages: write can publish. It does not set pull access.

Deployment boundary: Publication does not deploy. Use an immutable version tag and record its SHA-256 digest.
