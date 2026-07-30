import { expect, test } from '../../../fixtures/pom/test-options';
import { generateMessage } from '../../../test-data/factories/message.factory';

test.describe('Text message screen', () => {
  test.beforeEach(async ({ welcomePage, homePage, directoryPage, textMessagePage }) => {
    await welcomePage.open();
    await welcomePage.tapToStart();
    await homePage.goToDirectory();
    await directoryPage.expandResident('Danny Õcean');
    await directoryPage.startText();
    await expect(textMessagePage.heading).toBeVisible();
  });

  test(
    'should display the recipient, message composer, and a disabled send control',
    { tag: '@smoke' },
    async ({ textMessagePage }) => {
      await test.step('THEN the recipient and message composer are visible', async () => {
        await expect(textMessagePage.recipientLabel).toBeVisible();
        await expect(textMessagePage.messageInput).toBeVisible();
      });

      await test.step('THEN the send control is disabled while the message is empty', async () => {
        await expect(textMessagePage.sendButton).toBeDisabled();
      });
    }
  );

  test(
    'should enable the send control once a message is typed',
    { tag: '@regression' },
    async ({ textMessagePage }) => {
      const { body } = await generateMessage();

      await test.step('WHEN a message is typed', async () => {
        await textMessagePage.typeMessage(body);
      });

      await test.step('THEN the send control becomes enabled', async () => {
        await expect(textMessagePage.sendButton).toBeEnabled();
      });
    }
  );
});
