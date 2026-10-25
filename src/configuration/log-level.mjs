export const supportedLogLevels = ["error", "warn", "info", "http", "verbose", "debug", "silly"];

export function resolveLogLevel(value) {
  if (value === undefined) return "info";
  if (supportedLogLevels.includes(value)) return value;
  throw new RangeError(`LOG_LEVEL must be one of: ${supportedLogLevels.join(", ")}.`);
}
