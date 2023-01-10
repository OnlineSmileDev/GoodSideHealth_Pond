import Login from '../pageObjects/login'
import PatientArchive from '../pageObjects/patientArchive'
import RequestVisit from '../pageObjects/requestVisit'
import VisitDetails from '../pageObjects/visitDetails'

describe('patients', () => {
  const loginFac = new Login(browser)
  beforeEach(async () => {
    await loginFac.createPage()
    await loginFac.navigateToHome()
    await loginFac.loginAs('facilitator')
  })
  it('allows facilitator to search patients using filters and view patients', async () => {
    const facilitator = new PatientArchive(loginFac.page)
    await facilitator.page.waitForURL(/visits/)
    await facilitator.selectPatients()
    await facilitator.selectPatientsDropdown('patient-locations')
    await expect(facilitator.page).toHaveText(
      'div >> text="ACTON ELEMENTARY SCHOOL"',
      'ACTON ELEMENTARY SCHOOL'
    )
    await expect(facilitator.page).toHaveText(
      'div >> text="DUNCANVILLE HIGH SCHOOL"',
      'DUNCANVILLE HIGH SCHOOL'
    )
    await expect(facilitator.page).not.toHaveText(
      'div >> text="DEL VALLE HIGH SCHOOL"',
      'DEL VALLE HIGH SCHOOL'
    )

    await facilitator.inputPatientSearchText(
      'All Locations',
      SCHOOL_SEARCH_INPUT
    )

    await facilitator.selectDropdownValue(SCHOOL)
    await expect(facilitator.page).toHaveText(
      'div >> text="DUNCANVILLE HIGH SCHOOL"',
      'DUNCANVILLE HIGH SCHOOL'
    )

    await facilitator.selectPatientsDropdown('patient-locations')
    await facilitator.inputPatientSearchText('All Locations', 'All Locations')
    await facilitator.selectDropdownValue('All Locations')
    const patientCard = await facilitator.page.$('div >> .card-body')
    expect(patientCard).toBeTruthy()

    await facilitator.waitForPatientCards()
    const prevPagePatient = await facilitator.page.$eval(
      'data-test=patient-name-0',
      (el) => el.textContent
    )
    await facilitator.selectPage('Next')
    await facilitator.waitForPatientCards()
    const newPagePatient = await facilitator.page.$eval(
      'data-test=patient-name-0',
      (el) => el.textContent
    )
    expect(newPagePatient).not.toEqual(prevPagePatient)

    await facilitator.inputPatientSearchText('Search by First Name...', 'tri')
    await facilitator.waitForPageRefresh()
    await facilitator.waitForPatientCards()
    const patientNameWithTra = await facilitator.page.$eval(
      'data-test=patient-name-0',
      (el) => el.textContent
    )
    expect(patientNameWithTra).toMatch(/(tri)/i)

    await facilitator.inputPatientSearchText('Search by First Name...', 'trist')
    await facilitator.waitForPageRefresh()
    await facilitator.waitForPatientCards()
    const patientNameWithTrapp = await facilitator.page.$eval(
      'data-test=patient-name-0',
      (el) => el.textContent
    )
    expect(patientNameWithTrapp).toMatch(/(trist)/i)

    await facilitator.inputPatientSearchText('Search by First Name...', '')
    await facilitator.waitForPageRefresh()
    await facilitator.waitForPatientCards()

    await facilitator.inputPatientSearchText('Search by Last Name...', 'asa')
    await facilitator.waitForPageRefresh()
    await facilitator.waitForPatientCards()
    const patientNameWithMar = await facilitator.page.$eval(
      'data-test=patient-name-0',
      (el) => el.textContent
    )
    expect(patientNameWithMar).toMatch(/(asa)/i)

    await facilitator.inputPatientSearchText('Search by Last Name...', 'asani')
    await facilitator.waitForPageRefresh()
    await facilitator.waitForPatientCards()
    const patientNameWithMart = await facilitator.page.$eval(
      'data-test=patient-name-0',
      (el) => el.textContent
    )
    expect(patientNameWithMart).toMatch(/(asani)/i)

    await facilitator.viewPatient(0)
    await facilitator.page.waitForSelector('data-test=patient-details-name')
    await expect(facilitator.page).toHaveText(
      'data-test=patient-details-name',
      PATIENT_NAME
    )
  })

  it('allows facilitator to request visit for patients on patient page', async () => {
    const facilitator = new PatientArchive(loginFac.page)
    const requestVisit = new RequestVisit(loginFac.page)
    const visitDetails = new VisitDetails(loginFac.page)
    await facilitator.page.waitForURL(/visits/)
    await facilitator.selectPatients()

    await facilitator.waitForPageRefresh()
    await facilitator.waitForPatientCards()

    await facilitator.inputPatientSearchText(
      'Search by First Name...',
      CLAIM_VISIT_REQUEST_SEARCH_INPUT
    )
    await facilitator.waitForPageRefresh()
    await facilitator.waitForPatientCards()

    await facilitator.requestVisit(0)
    await facilitator.page.waitForSelector('.modal-title')
    const title = await facilitator.page.$eval(
      '.modal-title',
      (el) => el.textContent
    )
    expect(title).toMatch('Request Visit')

    await facilitator.page.click('button:has-text("Next")')
    await requestVisit.selectReasonDropdown()
    await requestVisit.selectReason()
    await requestVisit.startVisit()

    await facilitator.page.waitForURL(/visit/)
    await facilitator.waitForPageRefresh()
    await visitDetails.inputWeight()
    await visitDetails.selectSaveButton()
    await facilitator.page.waitForSelector('data-test=patient-name')
    await expect(facilitator.page).toHaveText(
      'data-test=patient-name',
      PATIENT_NAME
    )
  })
})
