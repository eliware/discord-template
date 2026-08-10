import { jest, expect, test } from '@jest/globals';
import handler from '../../events/threadMembersUpdate.mjs';

test('threadMembersUpdate handler stub', async () => {
  const log = { debug: jest.fn(), info: jest.fn(), error: jest.fn(), warn: jest.fn() };
  await expect(handler({ log })).resolves.toBeUndefined();
});
