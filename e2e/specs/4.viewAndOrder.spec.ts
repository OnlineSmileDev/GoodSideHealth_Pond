import DashboardOnDemand from '../pageObjects/dashboardOnDemand'
import Login from '../pageObjects/login'
import RequestVisit from '../pageObjects/requestVisit'
import VisitDetails from '../pageObjects/visitDetails'

describe('dashboard', () => {
  jest.setTimeout(300000)
  const loginFac = new Login(browser)
  const loginProv = new Login(browser)
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
    await loginProv.createPage()
    await loginProv.navigateToHome()
    await loginProv.loginAs('provider')

    const dashboard = new DashboardOnDemand(loginProv.page)
    await dashboard.claimMostRecentVisit(loginFac.page.url())
  })
  it('allows providers to add medication and test and verify orders on facilitator', async () => {
    const provider = new VisitDetails(loginProv.page)
    const facilitator = new VisitDetails(loginFac.page)
    await provider.addMedicationAndVerifyDropdownButtons()
    await provider.waitForDataRefresh(loginProv.page.url())
    await provider.moreDetailsButton('medications', 0)
    await expect(provider.page).toHaveText(
      'data-test=button-edit-order-medications-0',
      'Edit Order'
    )
    await expect(provider.page).toHaveText(
      'data-test=button-remove-order-medications-0',
      'Remove Order'
    )
    await provider.moreDetailsButton('medications', 0)
    await facilitator.moreDetailsButton('medications', 0)
    await expect(facilitator.page).toHaveText(
      'data-test=button-complete-order-medications-0',
      'Complete Order'
    )
    await expect(facilitator.page).toHaveText(
      'data-test=button-decline-order-medications-0',
      'Decline Order'
    )
    await facilitator.moreDetailsButton('medications', 0)
    await provider.addTestAndVerifyDropdownButtons()
    await provider.waitForDataRefresh(loginProv.page.url())
    await provider.moreDetailsButton('tests', 0)
    await expect(provider.page).toHaveText(
      'data-test=button-edit-order-tests-0',
      'Edit Order'
    )
    await expect(provider.page).toHaveText(
      'data-test=button-remove-order-tests-0',
      'Remove Order'
    )
    await facilitator.moreDetailsButton('tests', 0)
    await expect(facilitator.page).toHaveText(
      'data-test=button-complete-order-tests-0',
      'Complete Order'
    )
    await expect(facilitator.page).toHaveText(
      'data-test=button-decline-order-tests-0',
      'Decline Order'
    )
  })
})
