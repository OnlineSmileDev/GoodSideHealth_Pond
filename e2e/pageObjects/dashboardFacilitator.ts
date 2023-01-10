import { Page } from 'playwright'

export default class DashboardFacilitator {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  async searchPatientName(name: string) {
    await this.page.fill('input.search-control', name)
  }

  async clearDOB() {
    await this.page.click('input#dateOfBirth', { clickCount: 3 })
    await this.page.keyboard.press('Backspace')
  }
  // TODO: Reimplement if email input becomes active
  // async clearEmailAddress() {
  // 	await this.page.click('input#email', { clickCount: 3 })
  // 	await this.page.keyboard.press('Backspace')
  // }
}
