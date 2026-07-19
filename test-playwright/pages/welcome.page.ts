import { Locator, Page } from '@playwright/test';
import { welcome } from '../locales/en/welcome';

export class WelcomePage {
  constructor(private readonly page: Page) {}

  // ==================== Interactive Locators ====================

  get heading(): Locator {
    return this.page.getByRole('heading', { name: welcome.heading });
  }

  get tapToStartPrompt(): Locator {
    return this.page.getByText(welcome.tapToStart);
  }

  get brandLink(): Locator {
    return this.page.getByRole('link', { name: welcome.brandName });
  }

  get brandBlurb(): Locator {
    return this.page.getByText(welcome.brandBlurb);
  }

  get privacyPolicyLink(): Locator {
    return this.page.getByRole('link', { name: welcome.privacyPolicy });
  }

  get termsOfServiceLink(): Locator {
    return this.page.getByRole('link', { name: welcome.termsOfService });
  }

  // ==================== Actions ====================

  /**
   * Opens the QR intercom entry URL and waits for the welcome gate to render.
   * @returns {Promise<void>}
   */
  async open(): Promise<void> {
    await this.page.goto(process.env.E2E_TEST_BASE_URL!);
    await this.heading.waitFor({ state: 'visible' });
  }

  /**
   * Taps the welcome gate to dismiss it and reveal the home screen.
   * @returns {Promise<void>}
   */
  async tapToStart(): Promise<void> {
    await this.tapToStartPrompt.click();
  }
}
