export function isStringCatalog(values) {
  return (
    values !== null &&
    typeof values === "object" &&
    !Array.isArray(values) &&
    Object.values(values).every((value) => typeof value === "string")
  );
}
