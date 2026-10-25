# Discord application guide

Use this guide to configure and run the starter application.

> After you create a repository from this template, replace this guide with end-user documentation for your application.

## Requirements

Use Node.js 26 or later. Use npm 12 or later to validate this repository.
Create a Discord application and bot in the Discord Developer Portal.

## Install and configure

Run `npm ci` from the repository root to install the locked dependencies.
Copy `.env.example` to `.env`. Set `DISCORD_CLIENT_ID` to the application ID.
Set `DISCORD_TOKEN` to the test bot token. Keep `.env` out of Git.

Set `DISCORD_TEST_SERVER_ID` to the 17 to 20 digit ID for the test server.
Ask the test server owner for permission to add the bot.
Set `DISCORD_TEST_SERVER_AUTHORIZED=true` only after the owner gives permission.

Set `LOG_LEVEL` to change the log level. The default is `info`.
Use `error`, `warn`, `info`, `http`, `verbose`, `debug`, or `silly`.
The app rejects an unsupported log level before it creates the logger.

The application loads `.env` from the repository root. It uses the same root for configuration checks and Discord command, event, and locale files.

## Invite the bot

1. Open the application in the Discord Developer Portal.
2. Open OAuth2, then URL Generator.
3. Select `bot` and `applications.commands` under Scopes.
4. Select View Channels and Send Messages under Bot Permissions.
5. Copy the generated URL and open it in a browser.
6. Select the test server, then add the test bot after the owner gives permission.

The `applications.commands` scope makes `/help` available.
View Channels and Send Messages allow the bot to reply.
Do not grant Administrator for this template.

## Commands

The starter registers the localized `/help` command.
It returns a private reply to the person who invokes it.
The definition is in `commands/help.json`.
The adapter is in `commands/help.mjs`.
The handler is in `src/commands/help.mjs`.

Keep the command name in the JSON file, adapter, and handler aligned.
Update the localized name and description when you change the command.

## Events

The `clientReady` event logs the bot identity and applies the configured status.
The `interactionCreate` event sends slash commands to their app handlers.
Keep the event adapters in `events/`.
Keep event code in matching files under `src/events/`.
Add an event only when the application needs it.

## Locales

A locale is a language and region code used for translated messages.
The starter includes 32 locale files under `locales/`.

The command definition and each locale file use the same supported locale list.
Keep each file's message keys aligned with `locales/en-US.json`.

Run `npm run locale:add -- welcome "Welcome"` to add a key to every locale catalog.
The command keeps existing translations and adds the English message to `en-US.json`.
It marks each other missing value with `[TRANSLATE: Welcome]`.
Replace each marker with a translation after the command runs.
Run `npm test` after you change locale data.

## Intents and permissions

The starter enables only the Guilds intent.
It does not enable privileged intents.
The `/help` command needs View Channels and Send Messages permissions.
Add an intent or permission only when app behavior needs it.
Enable privileged intents in the Developer Portal when Discord requires them.

## Start and stop

Live Discord connection: this command connects `<test bot>` to `<test server>`.
Before you run it, set the test bot credentials and test server ID.
Ask the server owner for permission to add the bot.
Set `DISCORD_TEST_SERVER_AUTHORIZED=true` only after the owner gives permission.

```sh
npm start
```

The command loads `.env` and checks credentials, the test server ID, permission confirmation, and app files before it connects.
The app cannot verify the selected bot or server. Use only a test bot and a test server.
The app root comes from the entry point path, so the command can start from any working directory.
The library handles process errors and shutdown signals for this Discord-only app.
It calls `client.shutdown()` during shutdown.

If the application adds other services, use one app-owned shutdown coordinator.
Stop app services before the coordinator calls `client.shutdown()`.
Use that coordinator for signal and manual shutdown.
Read the `@eliware/discord` lifecycle guide for details.

## Container image

Build a local image with `docker build -t discord-template .`.
The Dockerfile runs the app as the unprivileged `node` user.
Pass credentials through an approved runtime secret store.
Do not copy `.env` into the image.

> Image purpose: runs this starter Discord app.
> Image visibility: [public or private before publication].
> Accounts with pull access: [list users and teams, or state that anyone can pull a public image].
>
> The workflow uses `GITHUB_TOKEN` with `packages: write` to publish. This does not set image visibility or pull access.
> The workflow builds `linux/amd64` images. Confirm the supported architecture and the owner of each build input.
> Replace these placeholders after you create a Discord application repository.

## Troubleshooting

If startup reports a missing application ID, set `DISCORD_CLIENT_ID` in the root `.env` file.
If startup reports a missing token, set `DISCORD_TOKEN` in the root `.env` file.
If `/help` does not appear, check the `applications.commands` scope and bot authorization.
If `/help` cannot reply, grant View Channels and Send Messages.
If a locale check fails, compare its message keys with `locales/en-US.json`.
If a command check fails, compare its definition, adapter, handler, and locale fields.

## Validate

Run `npm test` to check tests, lint, formatting, dependency audit, locale data, and repository profiles.
The tests use mocks and local files. They do not connect to Discord.
