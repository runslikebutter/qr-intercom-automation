import { test as base } from '@playwright/test';
import { WelcomePage } from '../../pages/welcome.page';
import { HomePage } from '../../pages/home.page';
import { DirectoryPage } from '../../pages/directory.page';
import { TextMessagePage } from '../../pages/text-message.page';

export type FrameworkFixtures = {
  welcomePage: WelcomePage;
  homePage: HomePage;
  directoryPage: DirectoryPage;
  textMessagePage: TextMessagePage;
};

export const test = base.extend<FrameworkFixtures>({
  welcomePage: async ({ page }, use) => {
    await use(new WelcomePage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  directoryPage: async ({ page }, use) => {
    await use(new DirectoryPage(page));
  },
  textMessagePage: async ({ page }, use) => {
    await use(new TextMessagePage(page));
  },
});
