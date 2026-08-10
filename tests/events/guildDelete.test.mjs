import { jest, expect, test } from '@jest/globals';
import handler from '../../events/guildDelete.mjs';

test('guildDelete handler stub', async () => {
  const log = { debug: jest.fn(), info: jest.fn(), error: jest.fn(), warn: jest.fn() };
  await expect(handler({ log })).resolves.toBeUndefined();
});
