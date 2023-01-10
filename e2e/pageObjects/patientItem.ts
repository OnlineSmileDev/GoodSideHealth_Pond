import { Page } from 'playwright'

export default class PatientItem {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  async selectVisit(id: number) {
    await this.page.click(`[data-test=patient-details-view-visit-button-${id}]`)
  }

  async selectVisitActivity() {
    await this.page.click('text="Visit Activity"')
  }

  async removeDateFilter() {
    await this.page.click('[data-test=patient-details-date-picker]')
    await this.page.click('button.btn-primary')
  }

  async selectOption(placeholder: string, dropdownValue: string) {
    await this.page.click('[data-test=patient-details-visit-reason-filter]')
    await this.page.selectOption(
      `select[placeholder='${placeholder}']`,
      dropdownValue
    )
  }
}
