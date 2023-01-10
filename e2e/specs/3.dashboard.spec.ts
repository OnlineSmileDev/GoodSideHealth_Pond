import DashboardOnDemand from '../pageObjects/dashboardOnDemand'
import Login from '../pageObjects/login'
import RequestVisit from '../pageObjects/requestVisit'

describe('dashboard', () => {
  const loginFac = new Login(browser)
  const loginProv = new Login(browser)
  beforeEach(async () => {
    await loginFac.createPage()
    await loginFac.navigateToHome()
    await loginFac.loginAs('facilitator')

    const visit = new RequestVisit(loginFac.page)
    await visit.requestNewVisit(CLAIM_VISIT_REQUEST_SEARCH_INPUT, PATIENT_NAME)
    await loginProv.createPage()
    await loginProv.navigateToHome()
    await loginProv.loginAs('provider')
  })
  it('allows providers to claim a visit', async () => {
    const dashboard = new DashboardOnDemand(loginProv.page)
    await dashboard.claimMostRecentVisit(loginFac.page.url())
    // TODO: Looks like need to be a date check to sort visits to grab correct one
    expect(loginProv.page.url()).toEqual(loginFac.page.url())
    await loginProv.page.reload()
    await expect(loginProv.page).toEqualText(
      'span.status-sign~span',
      'In Progress'
    )
    await loginFac.page.reload()
    await expect(loginFac.page).toEqualText(
      'span.status-sign~span',
      'In Progress'
    )
  })
})
