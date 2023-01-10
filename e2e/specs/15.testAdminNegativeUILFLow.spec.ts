import Login from '../pageObjects/login'
import ScheduleVisit from '../pageObjects/scheduleVisit'
import Dashboard from '../pageObjects/dashboard'
import VisitDetails from '../pageObjects/visitDetails'
import DashboardSchedule from '../pageObjects/dashboardSchedule'

describe('test admin UIL Negative Flow', () => {
  jest.setTimeout(300000)
  const loginTestSch = new Login(browser)
  const loginProv = new Login(browser)
  const loginTestAdm = new Login(browser)
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
    const provider = new Dashboard(loginProv.page)
    await provider.clickOnVisitsDropdown()
    await provider.selectScheduledVisits()
    const providerSchedule = new DashboardSchedule(loginProv.page)
    await loginProv.page.waitForSelector(`"${groupName}"`)
    await providerSchedule.searchGroupName(groupName)
    await providerSchedule.startSession()

    // login as a test admin
    await loginTestAdm.createPage()
    await loginTestAdm.navigateToHome()
    await loginTestAdm.loginAs('testadmin')
    const testAdm = new ScheduleVisit(loginTestAdm.page)
    await testAdm.openScheduleVisits(groupName)
    const providerVisitDetails = new VisitDetails(loginProv.page)

    await providerSchedule.selectStartVisit(0)
    await providerSchedule.selectFinalizeTesting()
    await providerSchedule.selectWarningFinalizeTesting()
    await providerVisitDetails.clickSignatureCanvas()
    await providerVisitDetails.selectInformationCheck()
    await providerVisitDetails.submitFinalizeTesting()
  })

  it('should verify test admin scheduled visits UIL negative flow', async () => {
    const testAdminSchedule = new DashboardSchedule(loginTestAdm.page)
    await testAdminSchedule.searchPatientName('Asani')
    const len1 = await loginTestAdm.page.$$eval(
      'table.table>tbody>tr',
      (items) => items.length
    )
    expect(len1).toBeGreaterThanOrEqual(1)
    testAdminSchedule.clearSearchField()
    testAdminSchedule.selectAddResult()
    testAdminSchedule.selectNegativeResult()
    const testAdminVisitDetails = new VisitDetails(loginTestAdm.page)
    testAdminVisitDetails.clickNextButton()
    await expect(loginTestAdm.page).toHaveText(
      'label.form-label[for="signature"]',
      'Draw Your Signature'
    )
    await expect(await testAdminVisitDetails.modalSuccessButtonDisabled())
      .toBeFalsy
    await testAdminVisitDetails.clickSignatureCheckbox()
    await expect(await testAdminVisitDetails.modalSuccessButtonDisabled())
      .toBeFalsy
    await testAdminVisitDetails.clickSignatureCanvas()
    await testAdminVisitDetails.clickSignatureCheckbox()
    await expect(await testAdminVisitDetails.modalSuccessButtonDisabled())
      .toBeFalsy
  })
})
