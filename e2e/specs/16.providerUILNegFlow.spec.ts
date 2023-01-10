import Login from '../pageObjects/login'
import ScheduleVisit from '../pageObjects/scheduleVisit'
import Dashboard from '../pageObjects/dashboard'
import VisitDetails from '../pageObjects/visitDetails'
import DashboardSchedule from '../pageObjects/dashboardSchedule'

describe('provider UIL Negative Flow', () => {
  jest.setTimeout(300000)
  const loginTestSch = new Login(browser)
  const loginProv = new Login(browser)
  const groupName = 'TestGroup' + Math.floor(Math.random() * 10000 + 1)

  beforeEach(async () => {
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
  })

  it('should verify provider scheduled visits UIL negative flow', async () => {
    const provDashboard = new Dashboard(loginProv.page)
    await provDashboard.clickOnVisitsDropdown()
    await provDashboard.selectScheduledVisits()
    const providerSchedule = new DashboardSchedule(loginProv.page)
    await loginProv.page.waitForSelector('data-test=visit-card')
    await providerSchedule.searchGroupName('abcdef')
    await expect(loginProv.page).toEqualText(
      'data-test=empty-visit-data-card >> h4',
      'There Are No Visits Available'
    )
    await providerSchedule.clearSearchField()
    await loginProv.page.waitForSelector(`"${groupName}"`)
    await providerSchedule.searchGroupName(groupName)
    await providerSchedule.startSession()

    await providerSchedule.selectStartVisit(0)
    const provVisitDetails = new VisitDetails(loginProv.page)

    await provVisitDetails.selectEditButtonWithUser(
      'patient-details',
      'Provider'
    )
    await expect(await provVisitDetails.modalNextButtonDisabled()).toBeFalsy
    await provVisitDetails.clickOnCloseButton()
    await providerSchedule.selectFinalizeTesting()
    await providerSchedule.selectWarningFinalizeTesting()
    await expect(await provVisitDetails.modalNextButtonDisabled()).toBeFalsy
    await expect(loginProv.page).toHaveText(
      'label[for="signature"]',
      'Draw Your Signature'
    )
    await provVisitDetails.clickSignatureCanvas()
    await provVisitDetails.selectApprovalCheck()
    await expect(await provVisitDetails.modalNextButtonDisabled()).toBeFalsy
  })
})
