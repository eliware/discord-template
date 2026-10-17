export function isEligibleGuildMessage(client, message) {
  return Boolean(
    client.user && message.author && message.guild && message.author.id !== client.user.id,
  );
}
