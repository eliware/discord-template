import { join } from "node:path";

export function loadApplicationEnvironment(rootDir, configureEnvironment) {
  return configureEnvironment({ path: join(rootDir, ".env") });
}
