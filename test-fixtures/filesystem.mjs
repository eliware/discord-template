export function createFileSystem({ files = {}, directories = {} } = {}) {
  const fileEntries = new Map(Object.entries(files));
  const directoryEntries = new Map(Object.entries(directories));

  return {
    readFileSync(path) {
      if (!fileEntries.has(path)) throw new Error(`File does not exist: ${path}`);
      return fileEntries.get(path);
    },
    readdirSync(path) {
      if (!directoryEntries.has(path)) throw new Error(`Directory does not exist: ${path}`);
      return directoryEntries.get(path);
    },
  };
}
