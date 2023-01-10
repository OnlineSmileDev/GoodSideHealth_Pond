import Login from '../pageObjects/login'
import ScheduleVisit from '../pageObjects/scheduleVisit'
import Dashboard from '../pageObjects/dashboard'
import VisitDetails from '../pageObjects/visitDetails'
import DashboardSchedule from '../pageObjects/dashboardSchedule'

describe('perform test for scheduler visits', () => {
  jest.setTimeout(300000)
  const loginTestSch = new Login(browser)
  const loginProv = new Login(browser)
  const loginTestAdm = new Login(browser)
  const groupName = 'TestGroup' + Math.floor(Math.random() * 10000 + 1)

  beforeAll(async () => {
    jest.setTimeout(50000)

    // login as a test scheduler
    await loginTestSch.createPage()
    await loginTestSch.navigateToHome()
    await loginTestSch.loginAs('testscheduler')
    const testsch = new ScheduleVisit(loginTestSch.page)
    await testsch.scheduleAVisit(groupName)

    // login as a provider
    await loginProv.createPage()
    await loginProv.navigateToHome()
    await loginProv.loginAs('provider')
    const provider = new Dashboard(loginProv.page)
    await provider.clickOnVisitsDropdown()
    await provider.selectScheduledVisits()
    await loginProv.page.waitForSelector(`"${groupName}"`)
    await provider.searchGroupName(groupName)
    await provider.startSession()

    // login as a test admin
    await loginTestAdm.createPage()
    await loginTestAdm.navigateToHome()
    await loginTestAdm.loginAs('testadmin')
    const testAdm = new ScheduleVisit(loginTestAdm.page)
    await testAdm.openScheduleVisits(groupName)
  })
  afterAll(async () => {
    await loginTestSch.context.close()
    await loginTestAdm.context.close()
    await loginProv.context.close()
    await loginProv.browser.close()
    await loginTestAdm.browser.close()
    await loginTestSch.browser.close()
  })
  it('allows provider to start a session visit and verify from provider, test admin & test scheduler', async () => {
    await new DashboardSchedule(loginProv.page).selectStartVisit(0)
    await loginProv.page.waitForSelector(
      'span.status-sign~span >> "In Progress"'
    )
    await expect(loginProv.page).toEqualText(
      'span.status-sign~span',
      'In Progress'
    )
    await loginTestSch.page.waitForSelector(
      'span.badge-outline-warning >> "In Progress"'
    )
    const isTestSchInProgress = await loginTestSch.page.$$eval(
      'span.badge-outline-warning',
      (el) => el.some((each) => each.textContent === 'In Progress')
    )
    expect(isTestSchInProgress).toBeTruthy()
    await loginTestAdm.page.waitForSelector(
      'span.badge-outline-warning >> "In Progress"'
    )
    const isTestAdmInProgress = await loginTestAdm.page.$$eval(
      'span.badge-outline-warning',
      (el) => el.some((each) => each.textContent === 'In Progress')
    )
    expect(isTestAdmInProgress).toBeTruthy()
  })
  it('Finalize for testing from provider and verify session visit from provider, test admin & test scheduler', async () => {
    const provider = new VisitDetails(loginProv.page)
    const provDash = new DashboardSchedule(loginProv.page)
    await provDash.selectFinalizeTesting()
    await provDash.selectWarningFinalizeTesting()
    await expect(loginProv.page).toHaveText(
      'label[for="signature"]',
      'Draw Your Signature'
    )
    await provider.clickSignatureCanvas()
    await provider.selectInformationCheck()
    await provDash.submitFinalizeTesting()
    await loginProv.page.waitForSelector(
      'span.e2e-waiting-for-result >> "Waiting For Result"'
    )
    await expect(loginProv.page).toHaveText(
      `span.e2e-waiting-for-result`,
      'Waiting For Result'
    )
    await loginTestSch.page.waitForSelector(
      'span.badge-outline-danger >> "Waiting For Result"'
    )
    const isTestSchWaitingForResult = await loginTestSch.page.$$eval(
      'span.badge-outline-danger',
      (el) => el.some((each) => each.textContent === 'Waiting For Result')
    )
    expect(isTestSchWaitingForResult).toBeTruthy()
    await loginTestAdm.page.waitForSelector(
      'span.badge-outline-danger >> "Waiting For Result"'
    )
    const isTestAdmWaitingForResult = await loginTestAdm.page.$$eval(
      'span.badge-outline-danger',
      (el) => el.some((each) => each.textContent === 'Waiting For Result')
    )
    expect(isTestAdmWaitingForResult).toBeTruthy()
    await provDash.selectReleaseButton()
    await provDash.selectReleaseButtonModal()
    await provDash.searchGroupName(groupName)
    await provDash.startSession()
    await expect(provDash.page).toHaveText(
      `span.e2e-waiting-for-result`,
      'Waiting For Result'
    )
  })
  it('Add result from test admin and verify session visit status from provider, test admin & test scheduler', async () => {
    const testAdmin = new VisitDetails(loginTestAdm.page)
    testAdmin.selectAddResult(groupName)
    testAdmin.selectNegativeResult()
    testAdmin.clickNextButton()
    await expect(loginTestAdm.page).toHaveText(
      'label.form-label[for="signature"]',
      'Draw Your Signature'
    )
    await testAdmin.clickSignatureCanvas()
    await testAdmin.clickSignatureCheckbox()
    await testAdmin.clickOnSubmitbutton()
    await loginProv.page.waitForSelector('span.e2e-patient-report-negative')
    await loginTestSch.page.waitForSelector(
      'span.e2e-session-test-result-negative'
    )
    await loginTestAdm.page.waitForSelector(
      'span.e2e-session-test-result-negative'
    )
    await expect(loginProv.page).toHaveText(
      'span.e2e-patient-report-negative',
      'Negative'
    )
    await expect(loginTestSch.page).toHaveText(
      `span.e2e-session-test-result-negative`,
      'Negative'
    )
    await expect(loginTestAdm.page).toHaveText(
      `span.e2e-session-test-result-negative`,
      'Negative'
    )
  })
})
