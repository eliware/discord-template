# AGENTS.md

## Project

`@eliware/discord-template` is a runnable Discord application template built on `@eliware/discord`.

## Scope and boundaries

- This template owns its application structure, examples, tests, packaging, and deployment examples.
- Do not publish, tag, deploy, or change external platform state without explicit authorization.

## Layout

- `commands/`, `events/`, and `locales/` contain application-owned Discord behavior.
- `tests/` contains the Jest suite; `.env.example` documents local configuration.

## Development

- Use Node.js 26 and native ESM.
- Keep commands, events, and locales application-owned and runnable from the documented directories.
- Keep Discord credentials in `.env`; never commit secrets.
- Preserve safe startup, shutdown, Docker, and systemd examples.

## Validation

Run `npm test`, `npm run test:gaps`, `npm run lint`, and `npm start` only with controlled credentials. Do not launch a production bot unintentionally.

## Security

Never commit `.env`, bot tokens, passwords, private keys, or credential-bearing URLs.

## Changes

Update README, `.env.example`, deployment files, and package dependencies together when configuration changes. Do not bump versions, tag, publish, or deploy unless explicitly requested.
