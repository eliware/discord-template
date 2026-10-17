export function discoverLocaleFiles(directory, fileSystem) {
  const files = fileSystem.readdirSync(directory).filter((file) => file.endsWith(".json"));
  return files;
}
