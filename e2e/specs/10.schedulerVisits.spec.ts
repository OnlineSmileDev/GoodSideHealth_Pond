import Login from '../pageObjects/login'
import ScheduleVisit from '../pageObjects/scheduleVisit'
import DashboardSchedule from '../pageObjects/dashboardSchedule'
import Dashboard from '../pageObjects/dashboard'

describe('scheduler visits', () => {
  jest.setTimeout(300000)
  const loginTestSch = new Login(browser)
  const loginProv = new Login(browser)
  const loginTestAdm = new Login(browser)
  const groupName = 'TestGroup' + Math.floor(Math.random() * 10000 + 1)
  beforeEach(async () => {
    jest.setTimeout(50000)
    await loginTestSch.createPage()
    await loginTestSch.navigateToHome()
    await loginTestSch.loginAs('testscheduler')
    await loginProv.createPage()
    await loginProv.navigateToHome()
    await loginProv.loginAs('provider')
    await loginTestAdm.createPage()
    await loginTestAdm.navigateToHome()
    await loginTestAdm.loginAs('testadmin')
  })

  it('create a schedule visits and verify from provider, test admin & test scheduler', async () => {
    const testsch = new ScheduleVisit(loginTestSch.page)
    await testsch.scheduleAVisit(groupName)
    const provider = new Dashboard(loginProv.page)
    await provider.clickOnVisitsDropdown()
    await provider.selectScheduledVisits()
    await loginProv.page.waitForSelector(`"${groupName}"`)
    const providerSchedule = new DashboardSchedule(loginProv.page)
    await providerSchedule.searchGroupName(groupName)
    await providerSchedule.startSession()
    const testAdm = new ScheduleVisit(loginTestAdm.page)
    await testAdm.openScheduleVisits(groupName)
    await expect(testsch.page).toHaveText(
      `css=.e2e-schedule-visit-session-groupname-${groupName}`,
      groupName
    )
    await expect(loginProv.page).toHaveText(
      `css=.e2e-provider-session-groupname-${groupName}`,
      groupName
    )
    await expect(loginTestAdm.page).toHaveText(
      `css=.e2e-schedule-visit-session-groupname-${groupName}`,
      groupName
    )
    await expect(loginTestSch.page).toHaveText(
      `css=.e2e-schedule-visit-session-schoolname-${groupName}`,

      SCHOOL
    )
    await expect(loginProv.page).toHaveText(
      `css=.e2e-provider-session-locationname-${groupName}`,

      SCHOOL
    )
    await expect(loginTestAdm.page).toHaveText(
      `css=.e2e-schedule-visit-session-schoolname-${groupName}`,

      SCHOOL
    )

    await expect(loginTestSch.page).toHaveText(
      `css=.e2e-schedule-visit-session-sessiontype-${groupName}`,

      SESSION_TYPE
    )
    await expect(loginProv.page).toHaveText(
      `css=.e2e-provider-session-sessiontype-${groupName}`,

      SESSION_TYPE
    )
    await expect(loginTestSch.page).toHaveText(
      `css=.e2e-schedule-visit-session-sessiontype-${groupName}`,

      SESSION_TYPE
    )
  })
})
