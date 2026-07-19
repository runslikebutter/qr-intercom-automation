import { Locator, Page } from '@playwright/test';
import { call } from '../../locales/en/call';

export class CallOverlayComponent {
  constructor(private readonly page: Page) {}

  // ==================== Interactive Locators ====================

  get endCallButton(): Locator {
    return this.page.getByRole('button', { name: call.endCall });
  }

  // ==================== Feedback Locators ====================

  // Callee name is session data, not app copy, so it's scoped by role rather than a locale
  // string. The directory's own "Directory" h1 stays mounted behind the overlay, so two
  // level-1 headings coexist — the overlay's is appended last in the DOM.
  get calleeName(): Locator {
    return this.page.getByRole('heading', { level: 1 }).last();
  }

  get statusText(): Locator {
    return this.page.getByText(call.connecting);
  }

  // ==================== Actions ====================

  /**
   * Ends the in-progress call.
   * @returns {Promise<void>}
   */
  async endCall(): Promise<void> {
    await this.endCallButton.click();
  }
}
