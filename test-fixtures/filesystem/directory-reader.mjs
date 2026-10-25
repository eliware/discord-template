export function createDirectoryReader({ directories = {} } = {}) {
  const directoryEntries = new Map(Object.entries(directories));

  return {
    readdirSync(path) {
      if (!directoryEntries.has(path)) throw new Error(`Directory does not exist: ${path}`);
      return directoryEntries.get(path);
    },
  };
}
