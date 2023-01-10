import { Page } from 'playwright'

export default class VisitDetails {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  async addMedications() {
    await this.page.click('text="Add Order"')
    await this.page.waitForSelector('text="Add Medication"')
    await this.page.click('text="Add Medication"')
  }

  async addInvitation(name: string, email: string) {
    await this.page.waitForSelector('text="Share Video Link"')
    await this.page.click('text="Share Video Link"')
    await this.page.waitForSelector('button:text("Share Link")')
    await this.page.fill(`input[placeholder="Recipient Name"]`, name)
    await this.page.click(`select[placeholder='Select Method']`)
    await this.page.selectOption(`select[placeholder='Select Method']`, 'email')
    await this.page.fill(`input[placeholder="Email"]`, email)
    await this.page.click('button:text("Share Link")')
  }

  async deleteInvitation(invitee: string) {
    await this.page.click(
      `data-test=invitation-row-${invitee} >> img.delete-icon`
    )
    await this.page.click(`text='Remove User'`)
  }

  async resendInvitation(invitee: string) {
    await this.page.click(
      `data-test=invitation-row-${invitee} >> img.resend-icon`
    )
    await this.page.click(`text='Resend Invitation'`)
  }

  async clickOnDropdown() {
    await this.page.click('id=dropdown')
  }

  async selectReason() {
    await this.page.click('text="Nausea/Vomiting/Abdominal Pain"')
  }

  async clickNextButton() {
    await this.page.waitForSelector('button:text("Next").disabled', {
      state: 'detached',
    })
    await this.page.click('text="Next"')
  }

  async endVisit() {
    await this.page.waitForSelector('"End Visit"')
    await this.page.click('text="End Visit"')
  }

  async warningModalEndVisit() {
    // TODO: Use a non pendo class name
    await this.page.click('data-test=warning-modal-finalize-button')
  }

  async selectReturnToSchoolButton() {
    await this.page.click('div[aria-label="today"]')
  }

  async addSummaryText(Summary: string) {
    await this.page.fill(`[placeholder="Your Notes..."]`, Summary)
  }

  async clearSummaryField() {
    await this.page.click(`[placeholder="Your Notes..."]`, { clickCount: 3 })
    await this.page.keyboard.press('Backspace')
  }

  async clickEnterPharmacyDetails() {
    await this.page.click('div[aria-label="prescribe-antibiotics-toggle"]')
  }

  async enterPharmacyDetails(PharmacyDetails: string) {
    await this.page.waitForSelector('.form-group>>textarea')
    await this.page.fill('.form-group textarea', PharmacyDetails)
  }

  async clickSignatureCanvas() {
    await this.page.waitForSelector('canvas.signatureCanvas')
    await this.page.click('canvas.signatureCanvas')
  }

  async clickSignatureCheckbox() {
    await this.page.dispatchEvent('div.custom-checkbox input', 'click')
  }

  async clickOnProviderCompleteButton() {
    // TODO: Use a non pendo class name
    await this.page.click('button.e2e-discharge-modal-submit-button-provider')
  }

  async enterNurseNotes(notes: string) {
    await this.page.fill('.row textarea', notes)
  }

  async clickOnFacilitatorCompleteButton() {
    // TODO: Use a non pendo class name
    await this.page.click('button.e2e-discharge-modal-submit-button-nurse')
  }

  async selectMedicine() {
    await this.page.click('text="Zofran (Ondansetron)"')
  }

  async selectDosage() {
    await this.page.click('text="Select Dosage"')
    await this.page.click('text=<15 kg:  Give ½ tablet = 2 mg')
  }

  async addAdditionalNotes(Notes: string) {
    await this.page.fill(`textarea[placeholder="Additional Notes"]`, Notes)
  }

  async clickOnSubmitbutton() {
    await this.page.waitForSelector('btn.disabled', {
      state: 'detached',
    })
    await this.page.dispatchEvent('button.btn-success', 'click')
  }

  async moreDetailsButton(type: string, index: number) {
    await this.page.waitForSelector(
      `data-test=button-more-details-${type}-${index}`
    )
    await this.page.click(`data-test=button-more-details-${type}-${index}`)
  }

  async addTest() {
    await this.page.click('text="Add Order"')
    await this.page.click('text="Add Test"')
  }

  async selectCovidTest() {
    await this.page.click('text="COVID-19"')
  }

  async addTestFlow() {
    await this.addTest()
    await this.clickOnDropdown()
    await this.selectCovidTest()
    await this.clickNextButton()
  }

  async selectReasonFlow() {
    await this.clickOnDropdown()
    await this.selectReason()
    await this.clickNextButton()
  }

  async addMedicationAndDosage() {
    await this.clickOnDropdown()
    await this.selectMedicine()
    await this.clickOnDropdown()
    await this.selectDosage()
    await this.clickNextButton()
  }

  async addMedicationAndVerifyDropdownButtons() {
    await this.addMedications()
    await this.selectReasonFlow()
    await this.addMedicationAndDosage()
    await this.addAdditionalNotes('This is an Additional Notes to medication')
    await this.clickOnSubmitbutton()
  }

  async addTestAndVerifyDropdownButtons() {
    await this.addTestFlow()
    await this.addAdditionalNotes('This is an Additional Notes to Test')
    await this.clickOnSubmitbutton()
  }

  async inputWeight() {
    await this.page.fill('input[name="weight"]', '116')
  }

  async selectSaveButton() {
    await this.page.click('"Save"')
  }

  async selectEditButton(section: string) {
    await this.page.click(`button.e2e-${section}-Facilitator`)
  }

  async selectEditButtonWithUser(section: string, user: string) {
    await this.page.click(`button.e2e-${section}-${user}`)
  }

  async clickOnCloseButton() {
    await this.page.click('button.close')
  }

  async updateDetails(field: string, data: string) {
    await this.page.click(`textarea#${field}`)
    await page.keyboard.press('Meta+A')
    await page.keyboard.press('Backspace')
    await this.page.fill(`textarea#${field}`, data)
  }

  async updateReason(reason: string) {
    await this.page.click(`[data-test=visit-reason] >> button`)
    await this.page.click(`div >> text="${reason}"`)
  }

  async updateVitalSigns(field: string, data: string) {
    await this.page.click(`input[name="${field}"]`)
    await page.keyboard.press('Meta+A')
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Delete')
    await this.page.fill(`input[name="${field}"]`, data)
  }

  async selectInformationCheck() {
    await this.page.dispatchEvent('input[name="informationCheck"]', 'click')
  }

  async selectAddResult(groupName: string) {
    await this.page.click(
      `data-test=session-name-${groupName} >> button.e2e-session-add-test-result`
    )
  }

  async selectPositiveResult() {
    await this.page.waitForSelector('span >> text="Positive"')
    await this.page.click('span >> text="Positive"')
  }

  async selectNegativeResult() {
    await this.page.waitForSelector('span >> text="Negative"')
    await this.page.click('span >> text="Negative"')
  }

  async addTestResult(groupName: string, result: string) {
    await this.selectAddResult(groupName)
    if (result === 'negative') await this.selectNegativeResult()
    else await this.selectPositiveResult()
    await this.clickNextButton()
    await this.clickSignatureCanvas()
    await this.clickSignatureCheckbox()
    await this.clickOnSubmitbutton()
    await this.page.waitForTimeout(4000)
  }

  async clickEditIcon(groupName: string) {
    await this.page.click(`[data-test=edit-icon-${groupName}]`)
  }

  async clickFirstPatient(index: number) {
    const patient = await this.page.$$('input[type="checkbox"][rowindex="0"]')
    await patient[index]?.click()
  }

  async selectAllPatient() {
    await this.page.click('th.selection-cell-header input')
  }

  async waitForPatientRows(groupName: string) {
    await this.page.waitForSelector(
      `data-test=session-name-${groupName} >> tbody >tr`
    )
  }

  async waitForSpinnerDetachment() {
    await this.page.waitForSelector('div.scrollbar>img.archive-spinner', {
      state: 'detached',
    })
  }

  async selectCompleteVisit(index: number) {
    const startVisit = await this.page.$$(
      'button.pendo-session-visit-button.btn-danger'
    )
    await startVisit[index]?.click()
  }

  async completePatientVisit(index: number) {
    await this.selectCompleteVisit(index)
    await this.selectDocumentEMR()
    await this.page.waitForTimeout(2000)
    await this.selectPatientNotified()
    await this.waitForDataRefresh(this.page.url())
  }

  async waitForPageRefresh() {
    await this.page.waitForSelector('.react-loading-skeleton')
    await this.page.waitForSelector('.react-loading-skeleton', {
      state: 'detached',
    })
  }

  async selectDocumentEMR() {
    await this.page.waitForSelector('span >> text="Visit Documented in EMR"')
    await this.page.click('span >> text="Visit Documented in EMR"')
  }

  async selectPatientNotified() {
    await this.page.dispatchEvent('input[name="patientNotified"]', 'click')
  }

  async waitForReactLoadingDetachment() {
    await this.page.waitForSelector('span.react-loading-skeleton', {
      state: 'detached',
    })
  }

  async clickReturnToSession() {
    await this.page.waitForSelector('button.pendo-session-visit-return-button')
    await this.page.click('button.pendo-session-visit-return-button')
  }

  async clickEndSession() {
    await this.page.click(
      'button.pendo-visits-sessions-archive-end-session-button'
    )
  }

  async selectApprovalCheck() {
    await this.page.dispatchEvent('input[name="approvalCheck"]', 'click')
  }

  async submitFinalizeTesting() {
    await this.page.waitForSelector('[data-test="finalize-submit-button"]')
    await this.page.click('[data-test="finalize-submit-button"]')
  }

  async clickWarningEndSession() {
    await this.page.click('div.modal-footer button.btn-warning')
  }

  async modalNextButtonDisabled() {
    await this.page.getAttribute('button.tw-bg-success', 'disabled')
  }

  async modalPrimaryNextButtonDisabled() {
    await this.page.getAttribute('.modal-footer button.btn-primary', 'disabled')
  }

  async modalSuccessButtonDisabled() {
    await this.page.getAttribute('button.btn-success', 'disabled')
  }

  async waitForDataRefresh(url: string) {
    const visitId = url.substring(url.lastIndexOf('/') + 1)
    await this.page.waitForRequest(new RegExp(`api/visits/${visitId}`))
    await this.page.waitForResponse(new RegExp(`api/visits/${visitId}`))
    await this.page.on(
      'requestfinished',
      async (request) =>
        request.url().includes(`api/visits/${visitId}`) &&
        (await this.page.waitForLoadState('networkidle'))
    )
  }
}
