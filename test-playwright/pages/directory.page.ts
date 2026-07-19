import { Locator, Page } from '@playwright/test';
import { directory } from '../locales/en/directory';
import { CallOverlayComponent } from './components/call-overlay.component';

export class DirectoryPage {
  /** Overlay shown while a call to a resident is in progress. */
  readonly callOverlay: CallOverlayComponent;

  constructor(private readonly page: Page) {
    this.callOverlay = new CallOverlayComponent(page);
  }

  // ==================== Interactive Locators ====================

  get goBackButton(): Locator {
    return this.page.getByRole('button', { name: directory.goBack });
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: directory.heading });
  }

  get searchInput(): Locator {
    return this.page.getByRole('textbox', { name: directory.searchLabel });
  }

  /**
   * The clickable row for a resident, identified by their exact directory name.
   * No ARIA role, label, or test-id exists on the resident card in this app, so
   * matching the visible name is the highest-priority feasible selector strategy.
   */
  residentRow(residentName: string): Locator {
    return this.page.getByText(residentName, { exact: true });
  }

  // Text/Call/Collapse resolve unambiguously only while a single resident row is expanded —
  // this app renders no per-row scoping attribute (no test-id, only hashed CSS-module
  // classnames), so expandResident() should be paired with collapseResident() before
  // expanding a different row.

  get textButton(): Locator {
    return this.page.getByRole('button', { name: directory.text });
  }

  get callButton(): Locator {
    return this.page.getByRole('button', { name: directory.call });
  }

  get collapseButton(): Locator {
    return this.page.getByRole('button', { name: directory.collapse });
  }

  // ==================== Feedback Locators ====================

  get noResultsMessage(): Locator {
    return this.page.getByText(directory.noResults);
  }

  get endOfDirectoryMarker(): Locator {
    return this.page.getByText(directory.endOfDirectory);
  }

  get residentUnavailableMessage(): Locator {
    return this.page.getByText(directory.residentUnavailable);
  }

  get mediaPermissionRequiredMessage(): Locator {
    return this.page.getByText(directory.mediaPermissionRequired);
  }

  // ==================== Actions ====================

  /**
   * Navigates back to the home screen.
   * @returns {Promise<void>}
   */
  async goBack(): Promise<void> {
    await this.goBackButton.click();
  }

  /**
   * Filters the directory list by name.
   * @param {string} query - Full or partial resident name.
   * @returns {Promise<void>}
   */
  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  /**
   * Expands a resident's row to reveal its Text/Call actions.
   * @param {string} residentName - Exact name as shown in the directory.
   * @returns {Promise<void>}
   */
  async expandResident(residentName: string): Promise<void> {
    await this.residentRow(residentName).click();
  }

  /**
   * Collapses the currently expanded resident row.
   * @returns {Promise<void>}
   */
  async collapseResident(): Promise<void> {
    await this.collapseButton.click();
  }

  /**
   * Starts a call with the currently expanded resident.
   * @returns {Promise<void>}
   */
  async startCall(): Promise<void> {
    await this.callButton.click();
  }

  /**
   * Opens the text-message composer for the currently expanded resident.
   * @returns {Promise<void>}
   */
  async startText(): Promise<void> {
    await this.textButton.click();
  }
}
