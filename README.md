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

Eliware owns this template. It runs a Discord app and provides HTTP health and readiness endpoints.

## Requirements

Use Node.js 26 or later and npm 12 or later for repository validation.

## Setup

Create a repository from this template and follow the [user guide](docs/README.md).

## Usage

Read the [user guide](docs/README.md) for setup and operations. Read [release notes](RELEASE_NOTES.md) for release history.

## Development

Read [AGENTS.md](AGENTS.md) and the [specifications index](specs/README.md) before changing files.

## Testing

Run `npm test` for aggregate validation.

## Troubleshooting

Use the troubleshooting section in the [user guide](docs/README.md#troubleshooting).

## Security

Keep credentials, private data, and runtime state out of Git.

## Configuration

Read the [configuration reference](docs/README.md#configuration).

## Operations

Run `npm start` to start Discord and the HTTP server on port 1030. Read the [health endpoint guide](docs/README.md#health-endpoints) and [container guidance](docs/README.md#container-image).

## Commands

The starter registers the localized `/help` command. Read the [command guide](docs/README.md#commands).

## Events

The starter handles `clientReady` and `interactionCreate`. Read the [event guide](docs/README.md#events).

## Intents and permissions

The client enables only the Guilds intent. Read the [Discord permissions guide](docs/README.md#intents-and-permissions).

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
