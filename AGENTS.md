# AGENTS.md

## Project

`@eliware/discord-template` is a runnable Discord application template built on `@eliware/discord`.

## Development

- Use Node.js 26 and native ESM.
- Keep commands, events, and locales application-owned and runnable from the documented directories.
- Keep Discord credentials in `.env`; never commit secrets.
- Preserve safe startup, shutdown, Docker, and systemd examples.

## Validation

Run `npm test`, `npm run test:gaps`, `npm run lint`, and `npm start` only with controlled credentials. Do not launch a production bot unintentionally.

## Changes

Update README, `.env.example`, deployment files, and package dependencies together when configuration changes. Do not bump versions, tag, publish, or deploy unless explicitly requested.
