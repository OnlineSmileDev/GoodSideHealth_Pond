import { Page } from 'playwright'

export default class VideoPopup {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  async clickExitButton() {
    await this.page.$eval('label >> text="Exit"', (el) => el.click())
  }
}
