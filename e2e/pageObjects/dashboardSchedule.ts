import { Page } from 'playwright'

export default class DashboardSchedule {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  async selectStartVisit(index: number) {
    await this.page.click(`button.e2e-session-visit-button-${index}`)
    await this.page.waitForSelector('span.status-sign~span')
  }

  async selectCompleteVisit(index: number) {
    const startVisit = await this.page.$$(
      'button.pendo-session-visit-button.btn-danger'
    )
    await startVisit[index]?.click()
  }

  async selectFinalizeTesting() {
    await this.page.waitForSelector('data-test=visit-finalize-button')
    await this.page.click('data-test=visit-finalize-button')
  }

  async selectWarningFinalizeTesting() {
    await this.page.waitForSelector('data-test=warning-modal-finalize-button')
    await this.page.click('data-test=warning-modal-finalize-button')
  }

  async submitFinalizeTesting() {
    await this.page.waitForSelector('btn.disabled', {
      state: 'detached',
    })
    await this.page.click('data-test=finalize-submit-button')
  }

  async selectInformationCheck() {
    await this.page.dispatchEvent('input[name="informationCheck"]', 'click')
  }

  async clickSignatureCanvas() {
    await this.page.waitForSelector('canvas.signatureCanvas')
    await this.page.click('canvas.signatureCanvas')
  }

  async selectApprovalCheck() {
    await this.page.dispatchEvent('input[name="approvalCheck"]', 'click')
  }

  async enterProviderScheduleNotes(notes: string) {
    await this.page.fill('textarea#test-denied', notes)
  }

  async selectReleaseButton() {
    await this.page.waitForSelector(
      'button.pendo-visits-sessions-archive-release-session-button'
    )
    await this.page.click(
      'button.pendo-visits-sessions-archive-release-session-button'
    )
  }

  async selectReleaseButtonModal() {
    await this.page.waitForSelector('data-test=release-session-modal-button')
    await this.page.click('[data-test=release-session-modal-button]')
  }

  async patientTest(index: number) {
    await this.selectStartVisit(index)
    await this.selectFinalizeTesting()
    await this.selectWarningFinalizeTesting()
    await this.clickSignatureCanvas()
    await this.selectInformationCheck()
    await this.submitFinalizeTesting()
    await this.page.waitForSelector('"Patients in Session"')
  }

  async patientTestWithoutApproval(index: number) {
    await this.selectStartVisit(index)
    await this.selectFinalizeTesting()
    await this.selectWarningFinalizeTesting()
    await this.clickSignatureCanvas()
    await this.selectInformationCheck()
    await this.selectApprovalCheck()
    await this.enterProviderScheduleNotes('absent')
    await this.submitFinalizeTesting()
    await this.page.waitForSelector('"Patients in Session"')
  }

  async searchGroupName(groupName: string) {
    await this.page.fill('input.e2e-visits-sessions-archive-search', groupName)
  }

  async searchField(key: string) {
    await this.page.fill(`input.search-control`, key)
  }

  async clearSearchField() {
    await this.page.click(`input.search-control`, { clickCount: 3 })
    await this.page.keyboard.press('Backspace')
  }

  async startSession() {
    await this.page.click('css:light=[id^="viewButton"]')
  }

  async selectAddResult() {
    await this.page.click('button.e2e-session-add-test-result')
  }

  async selectPositiveResult() {
    await this.page.check('input#symptomPositive')
  }

  async selectNegativeResult() {
    await this.page.check('input#symptomNegative')
  }

  async searchPatientName(name: string) {
    await this.page.fill('input.search-control', name)
  }

  async waitForDataRefresh() {
    await this.page.waitForRequest(/api[/]sessions[/]/)
    await this.page.waitForResponse(/api[/]sessions[/]/)
    await this.page.on('requestfinished', async (request) =>
      request.url().includes('/api/sessions/')
    )
  }

  // TODO: Determine if we need this
  async waitForVisitsDataRefresh() {
    await this.page.waitForRequest(/api[/]visits/)
    await this.page.waitForResponse(/api[/]visits/)
    await this.page.on(
      'requestfinished',
      async (request) =>
        request.url().includes('/api/visits/') &&
        (await this.page.waitForLoadState('networkidle'))
    )
  }

  async waitForPageRefresh() {
    await this.page.waitForSelector('.react-loading-skeleton')
    await this.page.waitForSelector('.react-loading-skeleton', {
      state: 'detached',
    })
  }
}
