const chatInputName = /^[-_'\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$/u;

export function isValidCommandName(name) {
  return chatInputName.test(name ?? "");
}
