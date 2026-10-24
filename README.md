# [![eliware.org](https://eliware.org/logos/brand.png)](https://discord.gg/M6aTR9eTwN)

## @eliware/discord-template [![License](https://img.shields.io/github/license/eliware/discord-template)](https://github.com/eliware/discord-template/blob/main/LICENSE) [![CI](https://github.com/eliware/discord-template/actions/workflows/ci.yaml/badge.svg)](https://github.com/eliware/discord-template/actions/workflows/ci.yaml)

A modern Discord app built with Node.js, based on the eliware/discord foundation.

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
- [Links](#links)
- [License](#license)

## Features

This template starts Discord applications. Each derived application owns its behavior and operating decisions.

## Requirements

Use Node.js 26 or later and npm 12 or later for repository validation.

## Setup

Create a repository from this template. Replace the template name, description, URLs, keywords, and sample content.
Run `npm ci` from the repository root.
Copy `.env.example` to `.env`, then set `DISCORD_CLIENT_ID` and `DISCORD_TOKEN`.

## Usage

Follow this README and the [user guide](docs/README.md). Read [release notes](RELEASE_NOTES.md) for release history.

## Development

Read [AGENTS.md](AGENTS.md) and [the specifications index](specs/README.md) before you change files.
Keep documents and records in the repository that owns them.

## Testing

Run `npm test` before handoff. It runs the repository checks through `eliware-test`.

## Troubleshooting

If the app cannot connect, verify `DISCORD_CLIENT_ID` and `DISCORD_TOKEN`. Confirm that the token matches the application.
If `/help` does not appear, check that the bot invite includes the `applications.commands` scope.
If `/help` cannot send a reply, grant View Channels and Send Messages.
See the [Discord application guide](docs/README.md) for setup steps.

## Security

Keep credentials, secrets, private data, and runtime state out of Git.
Use only approved secret stores for secret values.

## Configuration

Set `DISCORD_CLIENT_ID` and `DISCORD_TOKEN` before startup. Set `LOG_LEVEL` to configure the logger.
It defaults to `info`. Use `error`, `warn`, `info`, `http`, `verbose`, `debug`, or `silly`.
Store credentials in an untracked `.env` file or an approved secret store.

## Operations

Live Discord connection: set credentials for an approved test bot in a test server before you run `npm start`.
Run `npm start` from the repository root to validate settings and connect to Discord.
Build a local image with `docker build -t discord-template .`.

> **Template setup — update these values after you create a Discord application repository.**
>
> Replace the example image tag after publication. Set image visibility and access before publication.
> The workflow builds `linux/amd64` images. Confirm the supported architectures and who owns each build input.
> Configure image publication and update this section before you publish an image.

Deploy with a published version tag and its recorded SHA-256 digest. Publication does not deploy the bot.

## Commands

The starter registers the localized `/help` command. Its definition is `commands/help.json`.
Its implementation is `src/commands/help.mjs`. It returns a private reply to the person who invoked it.
Keep the root `commands/` file as a discovery adapter. Update the definition and implementation together.

## Events

Put event logic in `src/events/`. Keep matching discovery adapters in `events/`.
Keep the same keys in every locale file. Each event module must have a matching test.

## Intents and permissions

The client enables only the Guilds intent. The `/help` command needs channel view and message send permissions. Add access only when a command or event needs it.

## Support

For help, questions, or to chat with the author and community, visit:

[![Discord](https://eliware.org/logos/discord_96.png)](https://discord.gg/M6aTR9eTwN)[![eliware.org](https://eliware.org/logos/eliware_96.png)](https://discord.gg/M6aTR9eTwN)

**[eliware.org on Discord](https://discord.gg/M6aTR9eTwN)**

## Links

- [Home Page](https://eliware.org)
- [GitHub Org](https://github.com/eliware)
- [GitHub Repo](https://github.com/eliware/discord-template)
- [Bug Reports](https://github.com/eliware/discord-template/issues)
- [Discord](https://discord.gg/M6aTR9eTwN)

## License

[MIT © Eliware](LICENSE)
