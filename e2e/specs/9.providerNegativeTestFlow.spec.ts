import Dashboard from '../pageObjects/dashboard'
import DashboardSchedule from '../pageObjects/dashboardSchedule'
import Login from '../pageObjects/login'
import DashboardOnDemand from '../pageObjects/dashboardOnDemand'
import RequestVisit from '../pageObjects/requestVisit'
import VisitDetails from '../pageObjects/visitDetails'
import PatientArchive from '../pageObjects/patientArchive'

describe('provider negative flow', () => {
  const loginFac = new Login(browser)
  const loginProv = new Login(browser)

  beforeEach(async () => {
    await loginFac.createPage()
    await loginFac.navigateToHome()
    await loginFac.loginAs('facilitator')
    const visit = new RequestVisit(loginFac.page)
    // eslint-disable-next-line
    await visit.requestNewVisit(CLAIM_VISIT_REQUEST_SEARCH_INPUT, PATIENT_NAME)
    await loginProv.createPage()
    await loginProv.navigateToHome()
    await loginProv.loginAs('provider')
  })

  it('should verify provider negative test flow', async () => {
    const provider = new DashboardSchedule(loginProv.page)
    const providerDashboard = new Dashboard(loginProv.page)
    const patientArchive = new PatientArchive(loginProv.page)

    await loginProv.page.waitForSelector('data-test=visit-card')
    await providerDashboard.searchGroupName('abcde')
    await expect(loginProv.page).toEqualText(
      'data-test=empty-visit-data-card >> h4',
      'There Are No Visits Available'
    )
    await providerDashboard.clearSearchField()

    await providerDashboard.clickOnVisitsDropdown()
    await providerDashboard.selectScheduledVisits()
    await providerDashboard.searchGroupName('abcde')
    await expect(loginProv.page).toEqualText(
      'data-test=empty-visit-data-card >> h4',
      'There Are No Visits Available'
    )
    await providerDashboard.clearSearchField()

    await providerDashboard.clickOnSettingButton()
    await providerDashboard.clearFirstName()
    await providerDashboard.clickOnSaveButton()
    await expect(loginProv.page).toHaveText(
      'div.error-message',
      'First Name is required'
    )
    await providerDashboard.page.reload()
    await providerDashboard.clearLastName()
    await providerDashboard.clickOnSaveButton()
    await expect(loginProv.page).toHaveText(
      'div.error-message',
      'Last Name is required'
    )
    // TODO: reactivate if email becomes adjustable
    // await providerDashboard.page.reload()
    // await providerDashboard.clearEmailAddress()
    // await providerDashboard.clickOnSaveButton()
    // await expect(loginProv.page).toHaveText(
    // 	'div.error-message',
    // 	'E-mail is required'
    // )
    await providerDashboard.clickOnVisitLink()
    await providerDashboard.removeDateFilterOnVisitPage()
    await provider.page.waitForSelector('data-test=visit-card')
    await providerDashboard.searchGroupName('abcde')
    await expect(loginProv.page).toEqualText(
      'data-test=empty-visit-data-card >> h4',
      'There Are No Visits Available'
    )
    await providerDashboard.clearSearchField()

    await providerDashboard.clickOnPatientsLink()
    await provider.page.waitForSelector('data-test=patient-card')
    await patientArchive.inputPatientSearchText(
      'Search by First Name...',
      'abcde'
    )

    await expect(loginProv.page).toEqualText(
      'div.empty-data-indicator h4',
      'There are no results that meet your criteria.'
    )

    await providerDashboard.clickOnDashboardLink()
    await providerDashboard.clickOnVisitsDropdown()
    await providerDashboard.selectOnDemandVisits()
    const providerDashboardDemand = new DashboardOnDemand(loginProv.page)
    await providerDashboardDemand.claimMostRecentVisit(loginFac.page.url())

    const providerVisitDetails = new VisitDetails(loginProv.page)
    await providerVisitDetails.addMedications()
    await expect(await providerVisitDetails.modalPrimaryNextButtonDisabled())
      .toBeFalsy
    await providerVisitDetails.selectReasonFlow()
    await expect(await providerVisitDetails.modalPrimaryNextButtonDisabled())
      .toBeFalsy
  })
})
