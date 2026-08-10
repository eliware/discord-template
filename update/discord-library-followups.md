# Discord library follow-up updates

The `@eliware/discord` library is being improved. Update this template to remain compatible and to serve as the canonical usage example.

## Required updates

- Verify `@eliware/discord` version compatibility after library updates.
- Update the README to describe this repository as the complete working example.
- Ensure the README documents:
  - `commands/` JSON definitions and `.mjs` handlers
  - `events/` handler context and filenames
  - `locales/` file format and fallback behavior
  - startup and shutdown behavior
  - global versus guild command registration
- Add a minimal copy-pasteable startup example to the README, or link clearly to `example.mjs`.
- Keep command filenames identical to their command definition names.
- Ensure command definitions pass the library's stricter validation.
- Ensure intent and partial configuration uses supported names and boolean values.
- Review all event files for valid Discord.js event names.
- Update TypeScript examples/types if the library's exported handler types change.

## Recommended examples/tests

- Add a README example showing a command handler receiving:
  - `client`
  - `log`
  - `msg`
  - `commandHandlers` for `interactionCreate`
- Add a test for startup with the current library version.
- Add a test for command registration failure and clean shutdown.
- Add a test for locale fallback.
- Add a test that catches invalid command filenames or definitions.

## Compatibility checklist

Before updating the template's dependency:

```sh
npm install @eliware/discord@latest
npm test
npm run lint
```

Do not commit or deploy until the template's tests and documentation have been reviewed.
