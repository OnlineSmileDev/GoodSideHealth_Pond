import Login from '../pageObjects/login'
import ScheduleVisit from '../pageObjects/scheduleVisit'
import Dashboard from '../pageObjects/dashboard'
import VisitDetails from '../pageObjects/visitDetails'
import DashboardSchedule from '../pageObjects/dashboardSchedule'

describe('scheduler visits', () => {
  jest.setTimeout(300000)
  const loginTestSch = new Login(browser)
  const loginProv = new Login(browser)
  const loginTestAdm = new Login(browser)
  const groupName = 'TestGroup_' + Math.floor(Math.random() * 10000 + 1)
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
    await new ScheduleVisit(loginTestAdm.page).openScheduleVisits(groupName)
  })

  afterAll(async () => {
    await loginTestSch.context.close()
    await loginTestAdm.context.close()
    await loginProv.context.close()
    await loginProv.browser.close()
    await loginTestAdm.browser.close()
    await loginTestSch.browser.close()
  })

  it('edit a schedule visits from provider, test admin & test scheduler', async () => {
    const testSchVisit = new VisitDetails(loginTestSch.page)
    const testsch = new ScheduleVisit(loginTestSch.page)
    await testSchVisit.waitForPatientRows(groupName)
    await testSchVisit.clickEditIcon(groupName)
    await testSchVisit.page.waitForSelector(
      `data-test=session-name-${groupName} >> tbody >tr`
    )
    await testSchVisit.waitForSpinnerDetachment()
    await testSchVisit.clickFirstPatient(1)
    const numberOfPatients = await testSchVisit.page.$$eval(
      'data-test=selected-patients >> tbody>tr',
      (items) => items.length
    )
    await testSchVisit.clickNextButton()
    await testSchVisit.clickOnSubmitbutton()
    const providerSchedule = new DashboardSchedule(loginProv.page)
    const testAdm = new ScheduleVisit(loginTestAdm.page)
    await providerSchedule.waitForDataRefresh()
    await testsch.waitForDataRefresh()
    await testAdm.waitForDataRefresh()
    const testSchedulerPatientList = await loginTestSch.page.$$eval(
      `data-test=session-name-${groupName} >> tbody >tr`,
      (items) => items.length
    )
    expect(testSchedulerPatientList).toBe(numberOfPatients)
    const testAdminPatientList = await loginTestAdm.page.$$eval(
      `data-test=session-name-${groupName} >> tbody >tr`,
      (items) => items.length
    )
    expect(testAdminPatientList).toBe(numberOfPatients)
    const providerPatientList = await loginProv.page.$$eval(
      'tbody > tr',
      (items) => items.length
    )
    expect(providerPatientList).toBe(numberOfPatients)
    await testSchVisit.clickEditIcon(groupName)
    await testSchVisit.waitForSpinnerDetachment()
    await testsch.inputPatientSearchText(CLAIM_VISIT_REQUEST_SEARCH_INPUT) // eslint-disable-line
    await testSchVisit.waitForSpinnerDetachment()
    await loginTestSch.page.click('div >> text="Clear All"')
    await testSchVisit.selectAllPatient()
    const numberOfPatientsUpdated = await testSchVisit.page.$$eval(
      'data-test=selected-patients >> tbody>tr',
      (items) => items.length
    )
    await testSchVisit.clickNextButton()
    await testSchVisit.clickOnSubmitbutton()
    await providerSchedule.waitForDataRefresh()
    await testsch.waitForDataRefresh()
    await testAdm.waitForDataRefresh()
    const testSchedulerPatientListUpdated = await loginTestSch.page.$$eval(
      `data-test=session-name-${groupName} >> tbody >tr`,
      (items) => items.length
    )
    expect(testSchedulerPatientListUpdated).toBe(numberOfPatientsUpdated)
    const testAdminPatientListUpdated = await loginTestAdm.page.$$eval(
      `data-test=session-name-${groupName} >> tbody >tr`,
      (items) => items.length
    )
    expect(testAdminPatientListUpdated).toBe(numberOfPatientsUpdated)
    const providerPatientListUpdated = await loginProv.page.$$eval(
      `tbody > tr`,
      (items) => items.length
    )
    expect(providerPatientListUpdated).toBe(numberOfPatientsUpdated)
  })
  it('allows provider to deny test and verify from provider, test admin & test scheduler', async () => {
    const providerSchedule = new DashboardSchedule(loginProv.page)
    const testAdm = new ScheduleVisit(loginTestAdm.page)
    const testsch = new ScheduleVisit(loginTestSch.page)
    await providerSchedule.patientTestWithoutApproval(0)
    await testAdm.waitForDataRefresh()
    await testsch.waitForDataRefresh()
    await providerSchedule.waitForDataRefresh()
    const isTestDenied = await loginProv.page.$$eval(
      'span.badge-outline-danger',
      (el) => el.some((each) => each.textContent === 'Test Denied')
    )
    expect(isTestDenied).toBeTruthy()
    await expect(loginTestSch.page).toHaveText(
      `data-test=session-name-${groupName} >> span.badge-outline-success`,
      'Test Denied'
    )
    await expect(loginTestAdm.page).toHaveText(
      `data-test=session-name-${groupName} >> span.badge-outline-success`,
      'Test Denied'
    )
  })
  it('Complete a session and verify session status from provider, test admin & test scheduler', async () => {
    const providerSchedule = new DashboardSchedule(loginProv.page)
    const testAdm = new ScheduleVisit(loginTestAdm.page)
    const testsch = new ScheduleVisit(loginTestSch.page)
    const provVisit = new VisitDetails(loginProv.page)
    const testAdVisit = new VisitDetails(loginTestAdm.page)
    await providerSchedule.patientTest(1)
    await testAdVisit.addTestResult(groupName, 'positive')
    await testAdm.waitForDataRefresh()
    await testsch.waitForDataRefresh()
    await providerSchedule.waitForDataRefresh()
    await provVisit.completePatientVisit(0)
    await expect(loginProv.page).toEqualText(
      'span.status-sign~span',
      'Completed'
    )
    await expect(loginProv.page).toHaveText(
      'button:text("Download Clinical Note")',
      'Download Clinical Note'
    )
    await testAdm.waitForDataRefresh()
    await testsch.waitForDataRefresh()
    const isTestSchComplete = await loginTestSch.page.$$eval(
      `data-test=session-name-${groupName} >> tbody >tr >> span.badge-outline-success`,
      (el) => el.some((each) => each.textContent === 'Complete')
    )
    expect(isTestSchComplete).toBeTruthy()
    const isTestAdmComplete = await loginTestAdm.page.$$eval(
      `data-test=session-name-${groupName} >> tbody >tr >> span.badge-outline-success`,
      (el) => el.some((each) => each.textContent === 'Complete')
    )
    expect(isTestAdmComplete).toBeTruthy()
    await provVisit.clickReturnToSession()
    await provVisit.clickEndSession()
    await provVisit.clickWarningEndSession()
    await provVisit.waitForReactLoadingDetachment()
    const provider = new Dashboard(loginProv.page)
    await provider.clickOnVisitLink()
    await provider.removeDateFilterOnVisitPage()
    await provider.page.waitForSelector(`"${groupName}"`)
    await provider.searchGroupName(groupName)
    await provider.startSession()
    await testAdm.waitForDataRefresh()
    await testsch.waitForDataRefresh()
    await providerSchedule.waitForDataRefresh()
    await expect(loginProv.page).toHaveText(
      'span.badge-outline-success',
      'Visit Complete'
    )
    await expect(loginTestSch.page).toHaveText(
      `data-test=session-name-${groupName} >> span.badge-outline-warning`,
      'Absent'
    )
    await expect(loginTestAdm.page).toHaveText(
      `data-test=session-name-${groupName} >> span.badge-outline-warning`,
      'Absent'
    )
  })
})
