# [![eliware.org](https://eliware.org/logos/brand.png)](https://discord.gg/M6aTR9eTwN)

@eliware/discord-template [![License](https://img.shields.io/github/license/eliware/discord-template)](https://github.com/eliware/discord-template/blob/main/LICENSE) [![CI](https://github.com/eliware/discord-template/actions/workflows/ci.yaml/badge.svg)](https://github.com/eliware/discord-template/actions/workflows/ci.yaml)

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)
- [Usage](#usage)
- [Development](#development)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Security](#security)
- [Configuration](#configuration)
- [Operations](#operations)
- [Commands](#commands)
- [Events](#events)
- [Intents and permissions](#intents-and-permissions)
- [Support](#support)
- [License](#license)
- [Links](#links)

## Features

This template owns a reusable Discord application baseline; each derived application owns its commands, events, permissions, and runtime behavior.

Package description: A modern Discord app built with Node.js, based on the eliware/discord foundation. Author: Eliware <eliware@eliware.org>. License: MIT.

Purpose: provide a Discord application starter with localized help commands, event handlers, structured logging, graceful shutdown, container packaging, and complete locale data.

## Requirements

Use Node.js 26 and npm. Docker is required only to build and run the container image. A Discord application and its credentials are required for live startup.

## Setup

Create a repository from this template, update the package identity and repository URLs, then run `npm ci`. Copy `.env.example` to an untracked `.env` and set `DISCORD_CLIENT_ID` and `DISCORD_TOKEN` before starting the bot.

## Usage

Run `node bin/discord-template.mjs` to validate configuration and start the Discord client. The entrypoint loads `.env`, registers process handlers, and closes the client during shutdown. Live startup connects to Discord and requires valid application credentials.

Image: ghcr.io/eliware/discord-template
Pull command: docker pull ghcr.io/eliware/discord-template:v11.0.0
Supported tags: vMAJOR.MINOR.PATCH
Deployment boundary: publication does not deploy; deploy by immutable version tag and recorded sha256 digest.

## Development

Read [AGENTS.md](AGENTS.md), [specifications](specs/README.md), and the shared conventions before changing the template. Implement commands, events, and application logic under `src/`; keep root `commands/` and `events/` discovery adapters because `@eliware/discord` loads handlers from those directories.

Documentation: [docs](docs/README.md) · [specifications](specs/README.md)

## Testing

Run `npm test` for Jest with 100% statement, branch, function, and line coverage, lint, format-check, audit, and profile validation through `eliware-test`. Tests use mocks and local files; they do not connect to Discord. CI runs `npm ci` followed by `npm test`.

## Troubleshooting

If startup reports a missing credential, set the required variable in the untracked `.env` file or authorized deployment secret store. If command definitions or locales fail validation, correct the reported JSON file before starting the client.

## Security

Never commit `.env`, Discord tokens, passwords, private keys, or credential-bearing URLs. Keep the bot behind the intended network boundary and grant it only the intents and Discord permissions its commands require.

## Configuration

`DISCORD_CLIENT_ID` and `DISCORD_TOKEN` are required. `LOG_LEVEL` is optional, defaults to `info`, and accepts `error`, `warn`, `info`, `http`, `verbose`, `debug`, or `silly`. These runtime settings come from environment variables; `package.json` and `.knit/deploy.yaml` are metadata, not runtime configuration. The safe operational boundary excludes live startup without valid credentials and unintended bot permissions. See [.env.example](.env.example).

## Operations

Startup validates the command definition and locale catalog before creating a Discord client. The client connects with the declared intents; shutdown awaits client destruction. The externally observable workflows are Discord gateway connectivity and command interactions. The operational boundary permits only the documented intents and permissions. Use `node bin/discord-template.mjs` with the required credentials, or build the container with `docker build -t discord-template .` and run it with `docker run --env-file .env discord-template`. The public image is `ghcr.io/eliware/discord-template`; pull a released version with `docker pull ghcr.io/eliware/discord-template:vMAJOR.MINOR.PATCH`. Only exact version tags identify releases. Publication does not deploy the bot. Any release requires the Operations release handoff, and a rollout requires a separate GitOps deployment handoff.

## Commands

The starter registers the localized `/help` command defined by `commands/help.json` and implemented by `src/commands/help.mjs`. The root `commands/help.mjs` adapter exposes the implementation to `@eliware/discord`. Update the definition and implementation together when customizing the command.

## Events

Event implementations live in `src/events/`; matching root files in `events/` expose them to the discovery loader in `@eliware/discord`. Each event module has one mirrored test under `tests/events/`. Locale files in `locales/` must retain the same keys as `en-US.json`.

## Intents and permissions

The client enables Guilds and GuildMessages intents. MessageContent, GuildMembers, GuildPresences, and GuildVoiceStates are disabled. The `/help` command requests channel viewing and message sending. Enable additional intents or permissions only when a maintained command or event requires them, and document the change.

## Support

For help or discussion, join the Eliware community:

[![Discord](https://eliware.org/logos/discord_96.png)](https://discord.gg/M6aTR9eTwN)

**[eliware.org on Discord](https://discord.gg/M6aTR9eTwN)**

## License

[license](LICENSE)

## Links

- [docs](docs/README.md)
- [Home Page](https://github.com/eliware/discord-template#readme)
- [GitHub repository](https://github.com/eliware/discord-template.git)
- [Eliware](https://eliware.org)
- [GitHub organization](https://github.com/eliware)
- [Discord](https://discord.gg/M6aTR9eTwN)
- [specifications](specs/README.md)
- [Release Notes](RELEASE_NOTES.md)
