import { faker } from '@faker-js/faker';

export type MessageData = {
  body: string;
};

/**
 * Builds a text-message body for the intercom "text a resident" composer.
 * @param {Partial<MessageData>} overrides - Optional field overrides.
 * @returns {MessageData} A message with a unique, human-recognisable body.
 */
export function generateMessage(overrides: Partial<MessageData> = {}): MessageData {
  return {
    body: `E2E ${faker.lorem.sentence(4)}`,
    ...overrides,
  };
}
