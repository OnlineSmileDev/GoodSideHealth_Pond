import Login from '../pageObjects/login'
import ScheduleVisit from '../pageObjects/scheduleVisit'

describe('scheduler UIL Negative Flow', () => {
  jest.setTimeout(300000)
  const loginTestSch = new Login(browser)

  beforeEach(async () => {
    jest.setTimeout(50000)

    // login as a test scheduler
    await loginTestSch.createPage()
    await loginTestSch.navigateToHome()
    await loginTestSch.loginAs('testscheduler')
  })

  it('should verify test scheduler UIL visits negative flow', async () => {
    const testsch = new ScheduleVisit(loginTestSch.page)
    await testsch.selectScheduleVisit()
    await expect(testsch.modalNextButtonDisabled()).toBeFalsy
    await testsch.selectFormDropdown()
    await testsch.inputLocationDropdownSearchText()
    await testsch.selectLocation()
    await testsch.modalNextStep()
    await testsch.waitForSpinnerDetachment()
    await testsch.inputPatientSearchText('abcdef')
    await expect(testsch.page).toEqualText(
      '[data-test="no-data"]',
      'No Patient Match found at DUNCANVILLE HIGH SCHOOL'
    )
    await testsch.clearInputPatientSearchField()
    await testsch.inputPatientSearchText(CLAIM_VISIT_REQUEST_SEARCH_INPUT)
    await testsch.selectAllPatient()
    await testsch.modalNextStep()
    await testsch.modalNextStep()
    await expect(await testsch.modalScheduleTestButtonDisabled()).toBeFalsy
  })
})
