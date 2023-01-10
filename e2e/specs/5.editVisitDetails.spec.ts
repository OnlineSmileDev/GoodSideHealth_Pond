import Login from '../pageObjects/login'
import RequestVisit from '../pageObjects/requestVisit'
import VisitDetails from '../pageObjects/visitDetails'

describe('dashboard', () => {
  jest.setTimeout(300000)
  const loginFac = new Login(browser)
  beforeEach(async () => {
    jest.setTimeout(50000)
    await loginFac.createPage()
    await loginFac.navigateToHome()
    await loginFac.loginAs('facilitator')
    const visit = new RequestVisit(loginFac.page)
    const facilitator = new VisitDetails(loginFac.page)

    await visit.requestNewVisit(CLAIM_VISIT_REQUEST_SEARCH_INPUT, PATIENT_NAME)
    await facilitator.inputWeight()
    await facilitator.selectSaveButton()
  })
  it('allow the facilitator to edit visits details', async () => {
    const facilitator = new VisitDetails(loginFac.page)
    // updated patient details
    await facilitator.selectEditButton('patient-details')
    await facilitator.updateDetails('allergies', 'skin allergy')
    await facilitator.updateDetails('medications', 'medicine1')
    await facilitator.updateDetails('conditions', 'condition1')
    await facilitator.selectSaveButton()
    await facilitator.waitForDataRefresh(loginFac.page.url())
    await expect(loginFac.page).toEqualText(
      'css=.e2e-allergies',
      'skin allergy'
    )
    await expect(loginFac.page).toEqualText('css=.e2e-medications', 'medicine1')
    await expect(loginFac.page).toEqualText('css=.e2e-conditions', 'condition1')

    // updated visit details
    await facilitator.selectEditButton('visit-details')
    await facilitator.updateReason('Fever')
    await facilitator.updateDetails(
      'additionalVisitNotes',
      'updated additional Visit Notes'
    )
    await facilitator.selectSaveButton()
    await facilitator.waitForDataRefresh(loginFac.page.url())
    await expect(loginFac.page).toEqualText(
      'css=.e2e-allergies',
      'skin allergy'
    )
    await expect(loginFac.page).toEqualText('css=.e2e-medications', 'medicine1')
    await expect(loginFac.page).toEqualText('css=.e2e-conditions', 'condition1')
    // updated vital signs
    await facilitator.selectEditButton('vital-signs')
    await facilitator.updateVitalSigns('weight', '116')
    await facilitator.updateVitalSigns('pulseRate', '78')
    await facilitator.selectSaveButton()
    await facilitator.waitForDataRefresh(loginFac.page.url())
    await expect(loginFac.page).toHaveText('css=.e2e-weight', '116 LBS/52.6 KG')
    await expect(loginFac.page).toEqualText('css=.e2e-pulse-rate', '78 BPM')
  })
})
