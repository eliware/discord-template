export function validateDiscordCredentials(environment) {
  const errors = [];
  if (!environment.DISCORD_CLIENT_ID) errors.push("DISCORD_CLIENT_ID is required");
  if (!environment.DISCORD_TOKEN) errors.push("DISCORD_TOKEN is required");
  return errors;
}
