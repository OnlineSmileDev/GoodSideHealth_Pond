import { Page } from 'playwright'
// import moment from 'moment'

export default class ScheduleVisit {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  async selectScheduleVisit() {
    await this.page.click('div[class*="e2e-schedule-test-button"]>button')
  }

  async selectFormDropdown() {
    await this.page.click('.modal-body >> id=dropdown')
  }

  async inputPatientSearchText(input: string) {
    await this.page.fill(
      'input.search-control[placeholder="Search by Name, DOB or ID"]',
      input
    )
    await this.waitForPatientDataLoad()
  }

  async waitForPatientDataLoad() {
    await this.page.waitForRequest(/api[/]patients[?]/)
    await this.page.waitForResponse(
      (response) =>
        response.url().includes('api/patients?') &&
        (response.ok() || response.status() === 304)
    )
  }

  async clearInputPatientSearchField() {
    await this.page.click(`input.search-control`, { clickCount: 3 })
    await this.page.keyboard.press('Backspace')
  }

  async selectAllPatient() {
    await this.page.click('th.selection-cell-header input')
  }

  async selectTest(sessionType: string) {
    await this.page.selectOption('select#selectTest', {
      label: sessionType,
    })
  }

  async selectTestFrequency() {
    await this.page.selectOption('select#selectFrequencyType', 'Single')
  }

  async enterGroupName(name: string) {
    await this.page.fill('input#groupName', name)
  }

  // async enterTestDate() {
  //     await this.page.fill('input#testDate',moment().add(1,'w').format("MM/DD/YY"))
  // }

  async clickOnScheduleTest() {
    await this.page.click(
      'button.e2e-schedule-test-modal-submit-button-test-scheduler'
    )
  }

  async openScheduleVisits(groupName: string) {
    await this.page.waitForSelector(
      `button.e2e-schedule-visit-session-view-more-${groupName}`
    )
    await this.page.click(
      `button.e2e-schedule-visit-session-view-more-${groupName}`
    )
  }

  // TODO: Duplicate selector with requestVisit ~ may need refactor in future
  async inputLocationDropdownSearchText() {
    await this.page.fill(
      'input[placeholder="Search Location"]',
      SCHOOL_SEARCH_INPUT
    )
  }

  // TODO: Duplicate selector with requestVisit ~ may need refactor in future
  async selectLocationDropdown() {
    await this.page.click('css=div.dropdown')
  }

  // TODO: Duplicate selector with requestVisit ~ may need refactor in future
  async modalNextStep() {
    await this.page.click('text="Next"')
  }

  async modalNextButtonDisabled() {
    return await this.page.getAttribute('text="Next"', 'disabled')
  }

  async modalScheduleTestButtonDisabled() {
    return await this.page.getAttribute('text="Schedule Test"', 'disabled')
  }
  // TODO: Duplicate selector with requestVisit ~ may need refactor in future
  async selectLocation() {
    await this.page.click(`td >> text="${SCHOOL}"`)
  }

  async waitForSpinnerDetachment() {
    await this.page.waitForSelector('div.scrollbar>img.archive-spinner', {
      state: 'detached',
    })
  }

  async waitForDataRefresh() {
    await this.page.waitForRequest(/api[/]visits[?]sessionId/)
    await this.page.waitForResponse(/api[/]visits[?]sessionId/)
    await this.page.on('requestfinished', async (request) =>
      request.url().includes('/api/visits?sessionId')
    )
  }

  async scheduleAVisit(groupName: string) {
    await this.selectScheduleVisit()
    await this.selectFormDropdown()
    await this.inputLocationDropdownSearchText()
    await this.selectLocation()
    await this.modalNextStep()
    await this.waitForSpinnerDetachment()

    await this.inputPatientSearchText(CLAIM_VISIT_REQUEST_SEARCH_INPUT)
    await this.waitForSpinnerDetachment()
    await this.selectAllPatient()
    await this.modalNextStep()
    await this.modalNextStep()

    await this.selectTest(SESSION_TYPE)
    await this.selectTestFrequency()
    await this.enterGroupName(groupName)
    await this.clickOnScheduleTest()
    await this.openScheduleVisits(groupName)
  }
}
