# Discord application guide

Use this guide to configure and run the starter application.

> After you create a repository from this template, replace this guide with end-user documentation for your application.

## Requirements

Use Node.js 26 or later to run the app. Use npm 12 or later for repository validation.
Create a Discord application and bot in the Discord Developer Portal.

## Configuration

Run `npm ci` from the repository root to install the locked dependencies.
Copy `.env.example` to `.env`. Keep `.env` out of Git.

Set `DISCORD_CLIENT_ID` to the application ID and `DISCORD_TOKEN` to the test bot token.
Set `DISCORD_TEST_SERVER_ID` to the 17 to 20 digit ID for the test server.
Ask the test server owner for permission to add the bot.
Set `DISCORD_TEST_SERVER_AUTHORIZED=true` only after the owner gives permission.

| Value                            | Default                   | Required | Purpose                                                     | Example                    |
| -------------------------------- | ------------------------- | -------- | ----------------------------------------------------------- | -------------------------- |
| `DISCORD_CLIENT_ID`              | Unset                     | Yes      | Application ID for the test bot.                            | `your-test-application-id` |
| `DISCORD_TOKEN`                  | Unset                     | Yes      | Token for the test bot.                                     | `your-test-bot-token`      |
| `DISCORD_TEST_SERVER_ID`         | Unset                     | Yes      | 17 to 20 digit test server ID.                              | `123456789012345678`       |
| `DISCORD_TEST_SERVER_AUTHORIZED` | `false` in `.env.example` | Yes      | Set to `true` only after the server owner gives permission. | `false`                    |
| `LOG_LEVEL`                      | `info`                    | No       | Logger level. Use one listed value.                         | `info`                     |

Supported `LOG_LEVEL` values are `error`, `warn`, `info`, `http`, `verbose`, `debug`, and `silly`.
The app rejects unsupported log levels before it creates the logger.
The application loads `.env` from the repository root.
The app uses that root for configuration checks and Discord command, event, and locale files.

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

## Health endpoints

The app starts an HTTP server on port `1030` before it connects to Discord.
The server binds to `0.0.0.0` and accepts `GET` requests without authentication.
Allow access to port 1030 only from trusted networks.

| Request       | Before Discord connects             | After `clientReady`             | Purpose                                       |
| ------------- | ----------------------------------- | ------------------------------- | --------------------------------------------- |
| `GET /health` | `200` with `{"status":"ok"}`        | `200` with `{"status":"ok"}`    | Confirms that the HTTP process responds.      |
| `GET /ready`  | `503` with `{"status":"not ready"}` | `200` with `{"status":"ready"}` | Reports if the `clientReady` event has fired. |

The server returns `405` for other methods and `404` for unknown paths.
The server sets `Cache-Control: no-store` on its responses.
Use `/health` for process checks and `/ready` for traffic readiness checks.

## Locales

A locale is a language and region code used for translated messages.
The starter includes 32 locale files under `locales/`.

The command definition and each locale file use the same supported locale list.
Keep each file's message keys aligned with `locales/en-US.json`.

Run `npm run locale:add -- welcome "Welcome"` to add a key to every locale catalog.
Before it writes any catalog, the command rejects malformed catalogs and catalogs with non-string values.
The command preserves existing non-empty translations.
It adds the English message to `en-US.json` when the requested value is missing or empty.
For other locales, it adds `[TRANSLATE: Welcome]` when the requested value is missing or empty.

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

The command validates credentials, the test server ID, permission confirmation, and app files before it connects.
The app cannot verify the selected bot or server. Use only a test bot and a test server.
The app root comes from the entry point path, so direct Node.js startup can use any working directory.
On `SIGINT` or `SIGTERM`, the app closes the HTTP server before it shuts down Discord.
The app uses the same repeatable shutdown path when code calls `client.shutdown()`.

## Container image

Build a local image with `docker build -t discord-template .`.
Run the image with `docker run --env-file .env -p 127.0.0.1:1030:1030 discord-template`.
The Dockerfile runs the app as the unprivileged `node` user.
Pass credentials through an approved runtime secret store.
Do not copy `.env` into the image.

> Image purpose: runs this starter Discord app.
> Image visibility: [public or private before publication].
> Accounts with pull access: [list users and teams, or state that anyone can pull a public image].
>
> Eliware owns the Dockerfile and repository files used as image build inputs.
> The workflow leaves `platforms` unset and builds for the `ubuntu-latest` runner architecture.
> The workflow uses `GITHUB_TOKEN` with `packages: write` to publish. This does not set image visibility or pull access.
> Replace these placeholders after you create a Discord application repository.

The GHCR workflow publishes version tags. It uses `GITHUB_TOKEN` with `packages: write`.
That token grants publishing access, but it does not set image visibility or pull access.
Publication does not deploy the app. Record and use the image SHA-256 digest for deployment.

## Troubleshooting

If startup reports a missing application ID, set `DISCORD_CLIENT_ID` in the root `.env` file.
If startup reports a missing token, set `DISCORD_TOKEN` in the root `.env` file.
If an application uses port 1030, stop it before startup.
If `/ready` returns `503`, check the Discord credentials and connection.
If `/help` does not appear, check the `applications.commands` scope and bot authorization.
If `/help` cannot reply, grant View Channels and Send Messages.

If a locale check fails, compare its message keys with `locales/en-US.json`.
If a command check fails, compare its definition, adapter, handler, and locale fields.

## Validate

Run `npm test` to check tests, lint, formatting, dependency audit, locale data, and repository profiles.
The tests use mocks and local files. They do not connect to Discord.
