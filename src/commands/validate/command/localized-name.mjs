import { isValidCommandName } from "./name.mjs";

export function isValidLocalizedCommandName(name) {
  return isValidCommandName(name);
}
