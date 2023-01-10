import { Page } from 'playwright'

export default class Dashboard {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  async clickOnVisitsDropdown() {
    await this.page.click('button.e2e-visits-sessions-toggle')
  }

  async selectScheduledVisits() {
    await this.page.click('a.e2e-visits-sessions-scheduled-visits')
  }

  async selectOnDemandVisits() {
    await this.page.click('a.e2e-visits-sessions-toggle-on-demand')
  }

  async clickOnSettingButton() {
    await this.page.click('div[class*="settings-button"]>a')
  }

  async selectDefaultLocation(location: string) {
    await this.page.selectOption('#defaultLocationId', { label: location })
  }

  async clickOnSaveButton() {
    await this.page.click('button[class*="save-button"]')
  }

  async clickOnDateOfBirth() {
    await this.page.click('#dateOfBirth')
  }

  async clickAllTimeInput() {
    await this.page.click('input.calender-input')
  }

  async clickOnQueueLink() {
    await this.page.click('//a[text()="Queue"]')
  }

  async clickOnDashboardLink() {
    await this.page.click('.pendo-dashboard-button>div:nth-child(1) a')
  }

  async clickOnVisitLink() {
    await this.page.click('a[href*="visits"]')
  }

  async clickOnPatientsLink() {
    await this.page.click('a[href*="patients"]')
  }

  async clearFirstName() {
    await this.page.click('input#firstName', { clickCount: 3 })
    await this.page.keyboard.press('Backspace')
  }

  async clearLastName() {
    await this.page.click('input#lastName', { clickCount: 3 })
    await this.page.keyboard.press('Backspace')
  }

  async clearEmailAddress() {
    await this.page.click('input#email', { clickCount: 3 })
    await this.page.keyboard.press('Backspace')
  }

  async searchGroupName(groupName: string) {
    await this.page.fill('input.e2e-visits-sessions-archive-search', groupName)
  }

  async startSession() {
    await this.page.click('css:light=[id^="viewButton"]')
  }

  async clickonAllTime() {
    await this.page.click(
      'button.pendo-visits-sessions-archive-all-time-button'
    )
  }

  async removeDateFilterOnVisitPage() {
    await this.page.click('div.pendo-visits-sessions-archive-date-picker input')
    await this.page.click('button.btn-primary')
  }

  async clearSearchField() {
    await this.page.click(`input.search-control`, { clickCount: 3 })
    await this.page.keyboard.press('Backspace')
  }

  async waitForPageRefresh() {
    await this.page.waitForSelector('.react-loading-skeleton')
    await this.page.waitForSelector('.react-loading-skeleton', {
      state: 'detached',
    })
  }
}
