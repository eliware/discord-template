export function createFileReader({ files = {} } = {}) {
  const fileEntries = new Map(Object.entries(files));

  return {
    readFileSync(path) {
      if (!fileEntries.has(path)) throw new Error(`File does not exist: ${path}`);
      return fileEntries.get(path);
    },
  };
}
