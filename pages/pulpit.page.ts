import { Locator, Page } from '@playwright/test';

export class PulpitPage {
  priceValue: Locator;
  tittleValue: Locator;
  ListValue: Locator;
  messageValue: Locator;

  constructor(private page: Page) {
    this.priceValue = this.page.locator('#widget_1_transfer_amount');
    this.tittleValue = this.page.locator('#widget_1_transfer_title');
    this.ListValue = this.page.locator('#widget_1_transfer_receiver');
    this.messageValue = this.page.locator('#show_messages');
  }
}
