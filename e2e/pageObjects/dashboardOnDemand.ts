import { Page } from 'playwright'

export default class DashboardOnDemand {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  async selectVisit(id: string) {
    await this.page.click(`[data-test=view-button-${id}]`)
  }

  async claimVisit() {
    await this.page.waitForSelector('data-test=claim-visit-modal-button', {
      timeout: 20000,
    })
    await this.page.$eval('data-test=claim-visit-modal-button', (element) =>
      element.click()
    )
  }

  async claimMostRecentVisit(url: string) {
    const visitId = url.substring(url.lastIndexOf('/') + 1)
    await this.selectVisit(visitId)
    await this.claimVisit()
    await this.page.waitForNavigation()
  }
}
