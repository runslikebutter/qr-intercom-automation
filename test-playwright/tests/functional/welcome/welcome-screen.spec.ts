import { expect, test } from '../../../fixtures/pom/test-options';

test.describe('Welcome screen', () => {
  test.beforeEach(async ({ welcomePage }) => {
    await welcomePage.open();
  });

  test(
    'should display the tap-to-start gate with ButterflyMX branding and legal links',
    { tag: '@smoke' },
    async ({ welcomePage }) => {
      await test.step('GIVEN the intercom entry URL is opened', async () => {
        await expect(welcomePage.heading).toBeVisible();
      });

      await test.step('THEN the tap-to-start prompt and branding are visible', async () => {
        await expect(welcomePage.tapToStartPrompt).toBeVisible();
        await expect(welcomePage.brandLink).toBeVisible();
        await expect(welcomePage.brandBlurb).toBeVisible();
      });

      await test.step('THEN the legal links are visible', async () => {
        await expect(welcomePage.privacyPolicyLink).toBeVisible();
        await expect(welcomePage.termsOfServiceLink).toBeVisible();
      });
    }
  );
});
