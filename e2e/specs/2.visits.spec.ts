import Login from '../pageObjects/login'
import RequestVisit from '../pageObjects/requestVisit'

describe('visits', () => {
  const loginFac = new Login(browser)
  beforeEach(async () => {
    await loginFac.navigateToHome()
    await loginFac.loginAs('facilitator')
  })
  it('allows facilitators to request a new visit', async () => {
    const visit = new RequestVisit(page)

    await visit.requestNewVisit(CLAIM_VISIT_REQUEST_SEARCH_INPUT, PATIENT_NAME)
    expect('[data-test=Waiting]').toContain('Waiting')
  })
})
