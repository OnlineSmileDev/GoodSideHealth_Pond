import DashboardOnDemand from '../pageObjects/dashboardOnDemand'
import Login from '../pageObjects/login'
import RequestVisit from '../pageObjects/requestVisit'
import VisitDetails from '../pageObjects/visitDetails'

describe('Video Invitation', () => {
  jest.setTimeout(300000)
  const loginFac = new Login(browser)
  const loginProv = new Login(browser)
  beforeAll(async () => {
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
  afterAll(async () => {
    await loginProv.context.close()
    await loginProv.browser.close()
  })
  it('allows providers to add video invitation and verify invitation on facilitator', async () => {
    const provider = new VisitDetails(loginProv.page)
    await provider.addInvitation(PATIENT_NAME, PATIENT_EMAIL)
    await loginProv.page.waitForSelector(
      `data-test=invitation-row-${PATIENT_EMAIL}`
    )
    await expect(loginProv.page).toHaveText('p.guest-name', PATIENT_NAME)
    await expect(loginProv.page).toHaveText(
      `data-test=invitee-${PATIENT_EMAIL}`,
      PATIENT_EMAIL
    )
    await loginFac.page.waitForSelector(
      `data-test=invitation-row-${PATIENT_EMAIL}`
    )
    await expect(loginFac.page).toHaveText('p.guest-name', PATIENT_NAME)
    await expect(loginFac.page).toHaveText(
      `data-test=invitee-${PATIENT_EMAIL}`,
      PATIENT_EMAIL
    )
  })
  it('allows facilitator to resend invitation to the user', async () => {
    const facilitator = new VisitDetails(loginFac.page)
    await facilitator.resendInvitation(PATIENT_EMAIL)
    await facilitator.page.waitForResponse(
      (response) =>
        !!response.url().match(new RegExp('api/invitations/video$')) &&
        response.ok()
    )
  })
  it('allows providers to remove invited user and verify invitations on facilitator', async () => {
    const provider = new VisitDetails(loginProv.page)
    await provider.page.waitForRequest(new RegExp('api/invitations/video'))
    await provider.page.waitForResponse(new RegExp('api/invitations/video'))
    await provider.deleteInvitation(PATIENT_EMAIL)
    await loginFac.page.waitForSelector(
      `data-test=invitation-row-${PATIENT_EMAIL}`,
      {
        state: 'detached',
      }
    )
    await expect(loginFac.page).not.toHaveText('p.guest-name', PATIENT_NAME)
    await loginProv.page.waitForSelector(
      `data-test=invitation-row-${PATIENT_EMAIL}`,
      {
        state: 'detached',
      }
    )
    await expect(loginProv.page).not.toHaveText('p.guest-name', PATIENT_NAME)
  })
})
