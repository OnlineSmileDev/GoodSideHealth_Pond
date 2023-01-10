import DashboardFacilitator from '../pageObjects/dashboardFacilitator'
import Login from '../pageObjects/login'
import moment from 'moment'
import RequestVisit from '../pageObjects/requestVisit'
import Dashboard from '../pageObjects/dashboard'
import PatientArchive from '../pageObjects/patientArchive'

describe('facilitator negative flow', () => {
  const loginFac = new Login(browser)

  beforeEach(async () => {
    await loginFac.createPage()
    await loginFac.navigateToHome()
    await loginFac.loginAs('facilitator')
  })

  it('should verify facilitator negative test flow', async () => {
    const facilitator = new DashboardFacilitator(loginFac.page)
    const facilitatorDashboard = new Dashboard(loginFac.page)
    const patientArchive = new PatientArchive(loginFac.page)
    // TODO: remove when old ui is permanently removed
    // await facilitator.clickAllTimeButton()
    await facilitatorDashboard.waitForPageRefresh()
    await facilitator.searchPatientName('abcd')
    await expect(loginFac.page).toHaveText(
      'data-test=empty-visit-data-card >> h4',
      'There Are No Visits Available'
    )
    await facilitatorDashboard.clearSearchField()
    await facilitatorDashboard.clickOnSettingButton()
    await facilitatorDashboard.clearFirstName()
    await facilitatorDashboard.clickOnSaveButton()
    await expect(loginFac.page).toHaveText(
      'div.error-message',
      'First Name is required'
    )
    await facilitator.page.reload()
    await facilitatorDashboard.clearLastName()
    await facilitatorDashboard.clickOnSaveButton()
    await expect(loginFac.page).toHaveText(
      'div.error-message',
      'Last Name is required'
    )
    // await facilitator.page.reload()
    // TODO: Will leave this here if we go back, but currently email is readonly
    // await facilitator.clearEmailAddress()
    // await facilitator.clickOnSaveButton()
    // await expect(loginFac.page).toHaveText(
    // 	'div.error-message',
    // 	'E-mail is required'
    // )
    // await facilitator.page.reload()

    await facilitatorDashboard.selectDefaultLocation('Select Default Location')

    await facilitatorDashboard.clickOnVisitLink()
    const visit = new RequestVisit(loginFac.page)
    await visit.claimVisitRequest()
    await expect(await visit.modalNextButtonDisabled()).toBeFalsy
    await visit.selectLocationDropdown()
    await visit.inputLocationDropdownSearchText()
    await visit.selectLocation()
    await visit.modalNextStep()
    await expect(await visit.modalNextButtonDisabled()).toBeFalsy
    await visit.selectPatientDropdown()
    await visit.inputPatientDropdownSearchText('abcdef')
    await expect(loginFac.page).toHaveText(
      'data-test=empty-search',
      'No Patient Match found at DUNCANVILLE HIGH SCHOOL'
    )
    await visit.clearCustomInputPatientSearchField()
    await visit.inputPatientDropdownSearchText(CLAIM_VISIT_REQUEST_SEARCH_INPUT)
    await visit.selectPatient(PATIENT_NAME)
    await visit.modalNextStep()
    await visit.modalNextStep()
    await expect(await visit.modalSuccessButtonDisabled()).toBeFalsy
    await visit.clickOnCloseButton()
    await facilitatorDashboard.clickAllTimeInput()
    await facilitator.page.click(
      `div[aria-label*="${moment().add(1, 'd').format('MMMM Do, YYYY')}"]`
    )
    await expect(loginFac.page).toHaveText(
      'data-test=empty-visit-data-card >> h4',
      'There Are No Visits Available'
    )
    await facilitatorDashboard.clickOnPatientsLink()
    await facilitator.page.waitForSelector('data-test=patient-card')

    await patientArchive.inputPatientSearchText(
      'Search by First Name...',
      'abcd'
    )
    await expect(loginFac.page).toEqualText(
      'div.empty-data-indicator h4',
      'There are no results that meet your criteria.'
    )
  })
})
