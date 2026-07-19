import { expect, test } from '../../../fixtures/pom/test-options';

test.describe('Directory screen', () => {
  test.beforeEach(async ({ welcomePage, homePage, directoryPage }) => {
    await welcomePage.open();
    await welcomePage.tapToStart();
    await homePage.goToDirectory();
    await expect(directoryPage.heading).toBeVisible();
  });

  test(
    'should display the search box and a populated resident list',
    { tag: '@smoke' },
    async ({ directoryPage }) => {
      await test.step('THEN the search box is visible', async () => {
        await expect(directoryPage.searchInput).toBeVisible();
      });

      await test.step('THEN the resident list renders through to its end marker', async () => {
        await expect(directoryPage.residentRow('Danny Õcean')).toBeVisible();
        await expect(directoryPage.endOfDirectoryMarker).toBeVisible();
      });
    }
  );

  test(
    'should filter the resident list by search query',
    { tag: '@regression' },
    async ({ directoryPage }) => {
      await test.step('WHEN searching for a known resident', async () => {
        await directoryPage.search('Danny');
      });

      await test.step('THEN only matching residents remain', async () => {
        await expect(directoryPage.residentRow('Danny Õcean')).toBeVisible();
        await expect(directoryPage.residentRow('Thomas Jefferson')).toBeHidden();
      });
    }
  );

  test(
    'should show a no-results message for an unmatched search',
    { tag: '@regression' },
    async ({ directoryPage }) => {
      await test.step('WHEN searching for a name that does not exist', async () => {
        await directoryPage.search('zzznotfound');
      });

      await test.step('THEN the no-results message is displayed', async () => {
        await expect(directoryPage.noResultsMessage).toBeVisible();
      });
    }
  );

  test(
    'should reveal Text and Call actions when a resident row is expanded',
    { tag: '@regression' },
    async ({ directoryPage }) => {
      await test.step('WHEN a resident row is expanded', async () => {
        await directoryPage.expandResident('Danny Õcean');
      });

      await test.step('THEN Text and Call actions become visible', async () => {
        await expect(directoryPage.textButton).toBeVisible();
        await expect(directoryPage.callButton).toBeVisible();
      });

      await test.step('WHEN the row is collapsed again', async () => {
        await directoryPage.collapseResident();
      });

      await test.step('THEN the Text and Call actions are hidden', async () => {
        await expect(directoryPage.textButton).toBeHidden();
        await expect(directoryPage.callButton).toBeHidden();
      });
    }
  );
});
