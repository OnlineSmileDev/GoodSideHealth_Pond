import Login from '../pageObjects/login'
import PatientItem from '../pageObjects/patientItem'
import PatientArchive from '../pageObjects/patientArchive'
import RequestVisit from '../pageObjects/requestVisit'

describe('patientItem', () => {
  const loginFac = new Login(browser)
  const loginProv = new Login(browser)
  beforeEach(async () => {
    await loginFac.navigateToHome()
    await loginFac.loginAs('facilitator')
    const visit = new RequestVisit(loginFac.page)
    await visit.requestNewVisit(CLAIM_VISIT_REQUEST_SEARCH_INPUT, PATIENT_NAME)

    await loginProv.createPage()
    await loginProv.navigateToHome()
    await loginProv.loginAs('provider')
  })
  it('allows provider to see the patient details', async () => {
    const patientItem = new PatientItem(loginProv.page)
    const patientArchive = new PatientArchive(loginProv.page)
    const today = new Date().toString()
    const todaysDate = new Date().getDate().toString()

    await patientArchive.selectPatients()
    await patientArchive.selectPatientsDropdown('patient-locations')
    await patientArchive.inputPatientSearchText(
      'All Locations',
      SCHOOL_SEARCH_INPUT
    )

    await patientArchive.selectDropdownValue(SCHOOL)

    await patientArchive.waitForPatientCards()
    await patientArchive.inputPatientSearchText(
      'Search by First Name...',
      CLAIM_VISIT_REQUEST_SEARCH_INPUT
    )
    await patientArchive.waitForPageRefresh()
    await patientArchive.waitForPatientCards()
    await expect(patientArchive.page).toHaveText(
      'data-test=patient-name-0',
      PATIENT_NAME
    )
    await patientArchive.viewPatient(0)
    await patientItem.page.waitForSelector('data-test=patient-details-name')
    await expect(patientItem.page).toHaveText(
      'data-test=patient-details-name',
      PATIENT_NAME
    )

    await patientItem.selectVisitActivity()
    await patientArchive.page.waitForSelector(
      'data-test=patient-details-visit-reason-0'
    )
    await patientArchive.inputPatientSearchText('All Time', today)
    await expect(patientItem.page).toHaveText(
      'data-test=patient-details-visit-date-0',
      todaysDate
    )
    await patientItem.removeDateFilter()
    await patientItem.selectOption('All Visit Reasons', 'Sore Throat')
    await expect(patientItem.page).toHaveText(
      'data-test=patient-details-visit-reason-0',
      'Sore Throat'
    )
    await expect(patientItem.page).toHaveText('.pagination >> span', '1')
    await patientItem.selectVisit(0)
    await expect(loginProv.page).toHaveText(
      'data-test=patient-name',
      PATIENT_NAME
    )
    await expect(loginProv.page).toHaveText(
      'data-test=visit-reason',
      'Sore Throat'
    )
  })
})
