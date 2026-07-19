import { expect, test } from '../../../fixtures/pom/test-options';

test.describe('Home screen', () => {
  test.beforeEach(async ({ welcomePage }) => {
    await welcomePage.open();
    await welcomePage.tapToStart();
  });

  test(
    'should display the building info and Property Directory entry point',
    { tag: '@smoke' },
    async ({ homePage }) => {
      await test.step('THEN the building logo, name, and address are visible', async () => {
        await expect(homePage.logo).toBeVisible();
        await expect(homePage.buildingName).toBeVisible();
        await expect(homePage.buildingAddress).toBeVisible();
      });

      await test.step('THEN the Property Directory button is visible', async () => {
        await expect(homePage.propertyDirectoryButton).toBeVisible();
      });
    }
  );
});
