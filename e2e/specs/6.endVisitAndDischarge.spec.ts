import DashboardOnDemand from '../pageObjects/dashboardOnDemand'
import Login from '../pageObjects/login'
import RequestVisit from '../pageObjects/requestVisit'
import VisitDetails from '../pageObjects/visitDetails'

describe('dashboard', () => {
  jest.setTimeout(300000)
  const loginFac = new Login(browser)
  const loginProv = new Login(browser)
  beforeEach(async () => {
    await loginFac.createPage()
    await loginFac.navigateToHome()
    await loginFac.loginAs('facilitator')

    const visit = new RequestVisit(loginFac.page)
    const facilitator = new VisitDetails(loginFac.page)

    await visit.requestNewVisit(CLAIM_VISIT_REQUEST_SEARCH_INPUT, PATIENT_NAME)
    await facilitator.inputWeight()
    await facilitator.selectSaveButton()
    await loginProv.createPage()
    await loginProv.navigateToHome()
    await loginProv.loginAs('provider')

    const dashboard = new DashboardOnDemand(loginProv.page)
    await dashboard.claimMostRecentVisit(loginFac.page.url())
  })

  it('allows providers/facilitator to end Visit and download discharge note', async () => {
    const provider = new VisitDetails(loginProv.page)
    const facilitator = new VisitDetails(loginFac.page)
    await provider.page.waitForTimeout(5000)
    await provider.endVisit()
    await expect(loginProv.page).toEqualText(
      'div.modal-content .modal-title',
      'Are You Sure You Want to End the Visit?'
    )
    await provider.warningModalEndVisit()
    await loginProv.page.waitForSelector(
      'div.modal-title >> text="Discharge Note"'
    )
    await expect(loginProv.page).toEqualText(
      'div.modal-title',
      'Discharge Note'
    )
    await loginFac.page.waitForSelector('div.modal-title')
    await expect(loginFac.page).toEqualText('div.modal-title', 'Discharge Note')
    await provider.selectReturnToSchoolButton()
    await provider.clickNextButton()
    await provider.clearSummaryField()
    await provider.addSummaryText('this is an additional summary')
    await provider.clickNextButton()
    await provider.clickEnterPharmacyDetails()
    await provider.enterPharmacyDetails('Pharmacy details entered...')
    await provider.clickNextButton()
    await expect(loginProv.page).toHaveText(
      'label.form-label[for="signature"]',
      'Draw Your Signature'
    )
    await provider.clickSignatureCanvas()

    await provider.clickSignatureCheckbox()
    await provider.clickOnProviderCompleteButton()
    await facilitator.waitForDataRefresh(loginProv.page.url())
    await facilitator.enterNurseNotes('Nurse Notes')
    await facilitator.clickNextButton()
    await expect(loginFac.page).toHaveText(
      'label.form-label[for="signature"]',
      'Draw Your Signature'
    )
    await facilitator.clickSignatureCanvas()
    await facilitator.clickSignatureCheckbox()
    await facilitator.clickOnFacilitatorCompleteButton()
    await facilitator.waitForDataRefresh(loginFac.page.url())
    await facilitator.waitForReactLoadingDetachment()
    await provider.waitForReactLoadingDetachment()
    await loginProv.page.waitForSelector('span.status-sign~span >> "Completed"')
    await expect(loginProv.page).toEqualText(
      'span.status-sign~span',
      'Completed'
    )
    await loginFac.page.waitForSelector('span.status-sign~span >> "Completed"')
    await expect(loginFac.page).toEqualText(
      'span.status-sign~span',
      'Completed'
    )
    await expect(loginFac.page).toEqualText(
      'button:text("Download Discharge Note")',
      'Download Discharge Note'
    )
    await provider.waitForReactLoadingDetachment()
    await expect(loginProv.page).toEqualText(
      'button:text("Download Discharge Note")',
      'Download Discharge Note'
    )
  })
})
