export function isValidCommandDescription(description) {
  return typeof description === "string" && description.length >= 1 && description.length <= 100;
}
