# Discord application guide

Use this guide to create, configure, and run a Discord application from this template.

## Create an application

1. Create a repository from this template.
2. Set the package name, description, URLs, and keywords.
3. Create a Discord application and bot in the Discord Developer Portal.
4. Store the client ID and token in `.env` or an approved secret store.
5. Keep `.env` out of Git.

## Configure access

Set `DISCORD_CLIENT_ID` and `DISCORD_TOKEN`. Set `LOG_LEVEL` only when needed. Its default is `info`.

Declare only the intents and permissions that the bot needs. Grant those permissions to the bot in each server. Protect the token as a secret.

## Commands and events

Put command and event logic under `src/`. Keep root `commands/` and `events/` as discovery adapters for `@eliware/discord`.

Add command definitions and locale text in their indexed data files. Validate all command definitions and supported locale files before client startup. Keep the same command keys in every supported locale.

The starter also includes a `!help` message handler. It needs the privileged Message Content intent. The template disables this intent by default. Enable it in `src/application.mjs` and in the Discord Developer Portal to use `!help` in guilds.

## Start and stop

Run `node bin/discord-template.mjs` to validate settings and connect to Discord. Live startup needs valid credentials and network access.

The process closes the Discord client during shutdown. Tests use mocks and local files. They do not connect to Discord.

## Container image

Build the image with `docker build -t discord-template .`. The image is `ghcr.io/eliware/discord-template`.

Use a released version tag and its recorded SHA-256 digest for deployment. Publication does not deploy the bot. Use an authorized deployment process.

## Validate

Run `npm test` before handoff. It checks tests, lint, formatting, audit, locale data, and applicable profile rules.
