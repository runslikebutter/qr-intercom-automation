export type MessageData = {
  body: string;
};

/**
 * Builds a text-message body for the intercom "text a resident" composer.
 * `@faker-js/faker` ships ESM-only, so it's loaded via dynamic import rather than a
 * static import — a static import compiles to `require()` under this project's
 * CommonJS module target, which fails on Node versions without synchronous
 * require-of-ESM support (e.g. the CI runner's Node 20).
 * @param {Partial<MessageData>} overrides - Optional field overrides.
 * @returns {Promise<MessageData>} A message with a unique, human-recognisable body.
 */
export async function generateMessage(
  overrides: Partial<MessageData> = {}
): Promise<MessageData> {
  const { faker } = await import('@faker-js/faker');
  return {
    body: `E2E ${faker.lorem.sentence(4)}`,
    ...overrides,
  };
}
