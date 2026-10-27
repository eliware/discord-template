import { jest, expect, test } from "@jest/globals";
import { basename } from "node:path";
import { addMessageKey } from "../../src/locales/add-message-key.mjs";

function createFileSystem(catalogs) {
  return {
    readdirSync: jest.fn(() => Object.keys(catalogs)),
    readFileSync: jest.fn((path) => catalogs[basename(path)]),
    writeFileSync: jest.fn((path, content) => {
      catalogs[basename(path)] = content;
    }),
  };
}

test("adds a message key to each supported locale catalog", () => {
  const catalogs = {
    "en-US.json": '{"help":"Help"}',
    "fr.json": '{"help":"Aide"}',
    "unsupported.json": '{"help":"Help"}',
  };
  const fileSystem = createFileSystem(catalogs);

  expect(addMessageKey("/locales", "about", "About", fileSystem)).toBe(2);
  expect(JSON.parse(catalogs["en-US.json"])).toEqual({ help: "Help", about: "About" });
  expect(JSON.parse(catalogs["fr.json"])).toEqual({
    help: "Aide",
    about: "[TRANSLATE: About]",
  });
  expect(catalogs["unsupported.json"]).toBe('{"help":"Help"}');
});

test("preserves translated values when a locale already has the key", () => {
  const catalogs = {
    "en-US.json": '{"help":"Help"}',
    "fr.json": '{"help":"Aide","about":"À propos"}',
  };
  const fileSystem = createFileSystem(catalogs);

  expect(addMessageKey("/locales", "about", "About", fileSystem)).toBe(1);
  expect(JSON.parse(catalogs["en-US.json"]).about).toBe("About");
  expect(JSON.parse(catalogs["fr.json"]).about).toBe("À propos");
  expect(fileSystem.writeFileSync).toHaveBeenCalledTimes(1);
});

test("replaces empty or non-string values for the requested key", () => {
  const catalogs = {
    "en-US.json": '{"about":""}',
    "fr.json": '{"about":42}',
  };
  const fileSystem = createFileSystem(catalogs);

  expect(addMessageKey("/locales", "about", "About", fileSystem)).toBe(2);
  expect(JSON.parse(catalogs["en-US.json"]).about).toBe("About");
  expect(JSON.parse(catalogs["fr.json"]).about).toBe("[TRANSLATE: About]");
});

test("rejects an empty key or message", () => {
  const fileSystem = createFileSystem({});
  expect(() => addMessageKey("/locales", " ", "Text", fileSystem)).toThrow(
    "key must be a non-empty string.",
  );
  expect(() => addMessageKey("/locales", "key", " ", fileSystem)).toThrow(
    "message must be a non-empty string.",
  );
});

test("does not update catalogs when a supported catalog contains invalid JSON", () => {
  const catalogs = {
    "en-US.json": '{"help":"Help"}',
    "fr.json": "{invalid",
  };
  const fileSystem = createFileSystem(catalogs);

  expect(() => addMessageKey("/locales", "about", "About", fileSystem)).toThrow();
  expect(fileSystem.writeFileSync).not.toHaveBeenCalled();
  expect(catalogs["en-US.json"]).toBe('{"help":"Help"}');
});
