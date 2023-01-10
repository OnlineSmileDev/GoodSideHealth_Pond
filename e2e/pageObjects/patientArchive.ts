import { Page } from 'playwright'

export default class PatientArchive {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  async selectPatients() {
    await this.page.click('text="Patients"')
  }

  async selectPatientsDropdown(dropdownName: string) {
    await this.page.click(`[data-test=${dropdownName}]`)
  }

  async inputPatientSearchText(placeholder: string, input: string) {
    await this.page.fill(`input[placeholder='${placeholder}']`, input)
  }

  async selectPage(pageNo: string) {
    await this.page.click(`ul >> text="${pageNo}"`)
  }

  async selectDropdownValue(dropdownValue: string) {
    await this.page.click(`div >> text="${dropdownValue}"`)
  }

  async waitForPatientCards() {
    await this.page.waitForSelector('data-test=patient-card')
  }

  async waitForPageRefresh() {
    await this.page.waitForSelector('.react-loading-skeleton')
    await this.page.waitForSelector('.react-loading-skeleton', {
      state: 'detached',
    })
  }

  async viewPatient(id: number) {
    await this.page.click(`[data-test=view-patient-button-${id}]`)
  }

  async requestVisit(id: number) {
    await this.page.click(`[data-test=request-visit-patient-button-${id}]`)
  }
}
