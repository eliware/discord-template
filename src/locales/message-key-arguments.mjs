export function parseMessageKeyArguments(argumentsList) {
  const [key, ...messageParts] = argumentsList;
  const message = messageParts.join(" ");
  if (!key || !message) {
    throw new Error('Usage: npm run locale:add -- <key> "<English message>"');
  }
  return { key, message };
}
