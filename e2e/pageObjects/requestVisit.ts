import { Page } from 'playwright'

export default class RequestVisit {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  async claimVisitRequest() {
    await this.page.click('text="Request Visit"')
  }

  async selectLocationDropdown() {
    await this.page.click('id=dropdown')
  }

  async inputLocationDropdownSearchText() {
    await this.page.fill(
      'input[placeholder="Search Location"]',
      SCHOOL_SEARCH_INPUT
    )
  }

  // TODO: Duplicate selector with scheduleVisit ~ may need refactor in the future
  async selectLocation() {
    await this.page.click(`td >> text="${SCHOOL}"`)
  }

  async modalNextStep() {
    await this.page.click('text="Next"')
  }

  async selectPatientDropdown() {
    await this.page.click('text="Select Patient"')
  }

  async inputPatientDropdownSearchText(input: string) {
    await this.page.fill(
      'input[placeholder="Search Patient by Name, Date of Birth or Student ID"]',
      input
    )
  }

  async clearCustomInputPatientSearchField() {
    await this.page.click(`id=dropdown >> input.search-control`, {
      clickCount: 3,
    })
    await this.page.keyboard.press('Backspace')
  }

  async selectPatient(name: string) {
    await this.page.click(`div[role="dialog"] >> text="${name}"`)
  }

  async selectReasonDropdown() {
    await this.page.click('text="Select Reason for Visit"')
  }

  async selectReason() {
    await this.page.click('div[role="dialog"] >> text="Sore Throat"')
  }

  async startVisit() {
    await this.page.click('text="Start Visit ASAP"')
  }

  async clickOnBackButton() {
    await this.page.click('')
  }

  async requestNewVisit(searchText: string, name: string) {
    await this.claimVisitRequest()
    await this.selectLocationDropdown()
    await this.inputLocationDropdownSearchText()
    await this.selectLocation()
    await this.modalNextStep()
    await this.selectPatientDropdown()
    await this.inputPatientDropdownSearchText(searchText)
    await this.selectPatient(name)
    await this.modalNextStep()
    await this.modalNextStep()
    await this.selectReasonDropdown()
    await this.selectReason()
    await this.startVisit()
  }

  async modalNextButtonDisabled() {
    await this.page.getAttribute('button.btn-primary', 'disabled')
  }

  async modalSuccessButtonDisabled() {
    await this.page.getAttribute('button.btn-success', 'disabled')
  }

  async clickOnCloseButton() {
    await this.page.click('button.close')
  }
}
