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
Use `error`, `warn`, `info`, `http`, `verbose`, `debug`, or `silly` for `LOG_LEVEL`.

Declare only the intents and permissions that the bot needs. Grant those permissions to the bot in each server. Keep the token secret.

## Install the bot

1. Open the application in the Discord Developer Portal.
2. Open OAuth2, then URL Generator.
3. Select `bot` and `applications.commands` under Scopes.
4. Select View Channels and Send Messages under Bot Permissions.
5. Copy the generated URL and open it in a browser.
6. Select the server, then authorize the bot.

These scopes make `/help` available and add the bot to a server. These permissions let `/help` reply in a channel.
Do not grant Administrator for this template.

## Commands and events

Put command and event logic under `src/`. Keep root `commands/` and `events/` as discovery adapters for `@eliware/discord`.

Add command definitions and locale text in their indexed data files. Validate all command definitions and supported locale files before client startup. Keep the same command keys in every supported locale.

The starter includes these locale catalogs: `bg`, `cs`, `da`, `de`, `el`, `en-GB`, `en-US`, `es-419`, `es-ES`, `fi`, `fr`, `hi`, `hr`, `hu`, `id`, `it`, `ja`, `ko`, `lt`, `nl`, `no`, `pl`, `pt-BR`, `ro`, `ru`, `sv-SE`, `th`, `tr`, `uk`, `vi`, `zh-CN`, and `zh-TW`.
Keep each catalog in `locales/`. Use the same message keys in every catalog.

The starter also includes a `!help` message handler. It needs the privileged Message Content intent. The template disables this intent by default. Enable it in `src/application.mjs` and in the Discord Developer Portal to use `!help` in guilds.

## Start and stop

Run `node bin/discord-template.mjs` from the app root to validate settings and connect to Discord. Live startup needs valid credentials and network access.

The app enables the library signal and process handlers because it has no other services to stop.
The library calls `client.shutdown()` during shutdown. This method removes package handlers and destroys the client.
Tests use mocks and local files. They do not connect to Discord.

If the app adds other services, set `signals` to `false` and use one app shutdown coordinator.
Stop app services, then call `client.shutdown()` from that coordinator.
Connect the same coordinator to signal and manual shutdown.
Read the discord package lifecycle guide for shutdown details.

## Container image

Build a local image with `docker build -t discord-template .`.

> **Template setup — update these values after you create a Discord application repository.**
>
> GHCR has a published `v12.0.0` image. Check the container package page linked in the root README for available image tags.
> The workflow builds `linux/amd64` images and publishes signed attestations. Configure the `ghcr-publish` GitHub environment for image publication.
> Confirm supported architectures and image access. Update the README and workflow when these values change.

Use a released version tag and its recorded SHA-256 digest for deployment. Publication does not deploy the bot. Use an approved deployment process.

## Validate

Run `npm test` before handoff. It checks tests, lint, formatting, audit, locale data, and applicable profile rules.
