import { readdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { join } from "node:path";

export const discordEvents = [
  "applicationCommandCreate",
  "applicationCommandDelete",
  "applicationCommandUpdate",
  "channelCreate",
  "channelDelete",
  "channelPinsUpdate",
  "channelUpdate",
  "clientReady",
  "debug",
  "emojiCreate",
  "emojiDelete",
  "emojiUpdate",
  "error",
  "guildBanAdd",
  "guildBanRemove",
  "guildCreate",
  "guildDelete",
  "guildIntegrationsUpdate",
  "guildMemberAdd",
  "guildMemberAvailable",
  "guildMemberRemove",
  "guildMembersChunk",
  "guildMemberUpdate",
  "guildScheduledEventCreate",
  "guildScheduledEventDelete",
  "guildScheduledEventUpdate",
  "guildScheduledEventUserAdd",
  "guildScheduledEventUserRemove",
  "guildUnavailable",
  "guildUpdate",
  "interactionCreate",
  "invalidated",
  "inviteCreate",
  "inviteDelete",
  "messageBulkDelete",
  "messageCreate",
  "messageDelete",
  "messageDeleteBulk",
  "messageReactionAdd",
  "messageReactionRemove",
  "messageReactionRemoveAll",
  "messageReactionRemoveEmoji",
  "messageUpdate",
  "presenceUpdate",
  "rateLimit",
  "roleCreate",
  "roleDelete",
  "roleUpdate",
  "shardDisconnect",
  "shardError",
  "shardReady",
  "shardReconnecting",
  "shardResume",
  "stageInstanceCreate",
  "stageInstanceDelete",
  "stageInstanceUpdate",
  "stickerCreate",
  "stickerDelete",
  "stickerUpdate",
  "threadCreate",
  "threadDelete",
  "threadListSync",
  "threadMembersUpdate",
  "threadMemberUpdate",
  "threadUpdate",
  "typingStart",
  "userUpdate",
  "voiceStateUpdate",
  "warn",
  "webhookUpdate",
];

export async function validateEventInventory(directory) {
  const names = readdirSync(directory)
    .filter((file) => file.endsWith(".mjs"))
    .map((file) => file.slice(0, -4));
  const errors = discordEvents
    .filter((name) => !names.includes(name))
    .map((name) => `missing event: ${name}`);
  errors.push(
    ...names
      .filter((name) => !discordEvents.includes(name))
      .map((name) => `unknown event: ${name}`),
  );
  for (const name of names) {
    const handler = await import(pathToFileURL(join(directory, `${name}.mjs`)));
    if (typeof handler.default !== "function") errors.push(`invalid event handler: ${name}`);
  }
  return errors;
}
