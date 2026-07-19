import { Locator, Page } from '@playwright/test';
import { home } from '../locales/en/home';

export class HomePage {
  constructor(private readonly page: Page) {}

  // ==================== Interactive Locators ====================

  get logo(): Locator {
    return this.page.getByRole('img', { name: home.logoAlt });
  }

  // Building name and address are tenant-configured data, not app copy, so they can't
  // live in a locale module — scoped by role since each renders exactly once per page.
  get buildingName(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  get buildingAddress(): Locator {
    return this.page.getByRole('paragraph');
  }

  get propertyDirectoryButton(): Locator {
    return this.page.getByRole('button', { name: home.propertyDirectoryButton });
  }

  // ==================== Actions ====================

  /**
   * Opens the property directory from the home screen.
   * @returns {Promise<void>}
   */
  async goToDirectory(): Promise<void> {
    await this.propertyDirectoryButton.click();
  }
}
