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

Set these values in an untracked `.env` file or an approved secret store.

| Variable                         | Default | Required | Purpose                                                                               |
| -------------------------------- | ------- | -------- | ------------------------------------------------------------------------------------- |
| `DISCORD_CLIENT_ID`              | None    | Yes      | Application ID for the test bot.                                                      |
| `DISCORD_TOKEN`                  | None    | Yes      | Token for the test bot.                                                               |
| `DISCORD_TEST_SERVER_ID`         | None    | Yes      | 17 to 20 digit ID for the test server.                                                |
| `DISCORD_TEST_SERVER_AUTHORIZED` | None    | Yes      | Set to `true` only after the server owner gives permission. The example uses `false`. |
| `LOG_LEVEL`                      | `info`  | No       | Supported values: `error`, `warn`, `info`, `http`, `verbose`, `debug`, and `silly`.   |

The app rejects unsupported `LOG_LEVEL` values before startup.

## Operations

Live Discord connection: `npm start` connects `<test bot>` to `<test server>`.
Use credentials for a test bot. Set the numeric ID for the test server.
Ask the server owner for permission before you add the bot. Set `DISCORD_TEST_SERVER_AUTHORIZED=true` only after the owner says yes.

The app checks the server ID format and permission confirmation before it connects.
It cannot verify the selected bot or server.

Run `npm start` from the repository root to validate configuration and connect to Discord.
Build a local image with `docker build -t discord-template .`.

> **Template setup — update these values after you create a Discord application repository.**
>
> Image purpose: runs this starter Discord app.
> Image visibility: [public or private before publication].
> Accounts with pull access: [list users and teams, or state that anyone can pull a public image].
>
> The workflow uses `GITHUB_TOKEN` with `packages: write` to publish. This does not set image visibility or pull access.
> The workflow builds `linux/amd64` images. Confirm the supported architecture and the owner of each build input.
> Replace these placeholders after you create a Discord application repository.

Deploy with a published version tag and its recorded SHA-256 digest.
Publication does not deploy the bot.

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
