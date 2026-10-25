export function validateDiscordCredentials(environment) {
  const errors = [];
  if (!environment.DISCORD_CLIENT_ID) errors.push("DISCORD_CLIENT_ID is required");
  if (!environment.DISCORD_TOKEN) errors.push("DISCORD_TOKEN is required");
  if (!/^\d{17,20}$/.test(environment.DISCORD_TEST_SERVER_ID ?? "")) {
    errors.push("DISCORD_TEST_SERVER_ID must be a 17 to 20 digit Discord server ID");
  }
  if (environment.DISCORD_TEST_SERVER_AUTHORIZED !== "true") {
    errors.push(
      "Set DISCORD_TEST_SERVER_AUTHORIZED to true only after the test server owner gives permission",
    );
  }
  return errors;
}
