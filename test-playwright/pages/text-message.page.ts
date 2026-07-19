import { Locator, Page } from '@playwright/test';
import { textMessage } from '../locales/en/textMessage';

export class TextMessagePage {
  constructor(private readonly page: Page) {}

  // ==================== Interactive Locators ====================

  get goBackButton(): Locator {
    return this.page.getByRole('button', { name: textMessage.goBack });
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: textMessage.heading });
  }

  // Recipient name/unit is session data, not app copy, so it isn't in the locale module.
  get recipientLabel(): Locator {
    return this.page.getByText(/^To: /);
  }

  get messageInput(): Locator {
    return this.page.getByRole('textbox', { name: textMessage.addMessagePlaceholder });
  }

  get sendButton(): Locator {
    return this.page.getByRole('button', { name: textMessage.send });
  }

  // ==================== Actions ====================

  /**
   * Types a message into the composer without sending it.
   * @param {string} message - The message body.
   * @returns {Promise<void>}
   */
  async typeMessage(message: string): Promise<void> {
    await this.messageInput.fill(message);
  }

  /**
   * Sends the composed message and waits for the app to return to the directory.
   * @returns {Promise<void>}
   */
  async send(): Promise<void> {
    await this.sendButton.click();
  }
}
