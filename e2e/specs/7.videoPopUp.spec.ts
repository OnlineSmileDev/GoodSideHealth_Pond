import Login from '../pageObjects/login'
import RequestVisit from '../pageObjects/requestVisit'
import VisitDetails from '../pageObjects/visitDetails'
import DashboardOnDemand from '../pageObjects/dashboardOnDemand'
import VideoPopup from '../pageObjects/videoPopup'
// TODO: Remove when permanent webhook solution is found
const itif = (envVar: string | undefined) => (envVar ? it : it.skip)
describe('Tests the video pop up functionality for nurse and provider', () => {
  jest.setTimeout(300000)
  const loginFac = new Login(browser)
  const loginProv = new Login(browser)

  beforeEach(async () => {
    jest.setTimeout(50000)
    await loginFac.createChromiumPage()
    await loginFac.navigateToHome()
    await loginFac.loginAs('facilitator')

    const visit = new RequestVisit(loginFac.page)

    await visit.requestNewVisit(CLAIM_VISIT_REQUEST_SEARCH_INPUT, PATIENT_NAME)
    await loginProv.createChromiumPage()
    await loginProv.navigateToHome()
    await loginProv.loginAs('provider')

    const provider = new DashboardOnDemand(loginProv.page)

    await provider.claimMostRecentVisit(loginFac.page.url())
    const facilitator = new VisitDetails(loginFac.page)
    await facilitator.inputWeight()
    await facilitator.selectSaveButton()
  })

  afterEach(async () => {
    await loginFac.context.close()
    await loginProv.context.close()
    await loginProv.browser.close()
    await loginFac.browser.close()
  })
  afterAll(async () => {
    await loginFac.context.close()
    await loginProv.context.close()
    await loginProv.browser.close()
    await loginFac.browser.close()
  })

  itif(process.env.NEXT_PUBLIC_PROXY)(
    'allows a facilitator to open the visit and update the status',
    async () => {
      // eslint-disable-next-line jest/no-standalone-expect
      await expect(loginProv.page).toEqualText(
        '.e2e-video-visit-text',
        'Waiting on other party to Join...'
      )
      // eslint-disable-next-line jest/no-standalone-expect
      await expect(loginFac.page).toEqualText(
        '.e2e-video-visit-text',
        'Waiting on other party to Join...'
      )

      const [facPage] = await Promise.all([
        loginFac.context.waitForEvent('page'),
        await loginFac.page.click('text="Open Video Visit"'),
      ])
      await loginProv.page.waitForSelector(
        '.e2e-video-visit-text >> "Auto Facilitator Has Joined the Visit"'
      )
      // eslint-disable-next-line jest/no-standalone-expect
      await expect(loginProv.page).toEqualText(
        '.e2e-video-visit-text',
        'Auto Facilitator Has Joined the Visit'
      )
      // eslint-disable-next-line jest/no-standalone-expect
      await expect(loginFac.page).toEqualText(
        '.e2e-video-visit-text',
        'Waiting on other party to Join...'
      )
      await facPage.close()
      await loginProv.page.close()
      await loginFac.page.close()
    }
  )

  itif(process.env.NEXT_PUBLIC_PROXY)(
    'allows a provider to open the visit and update the status',
    async () => {
      // eslint-disable-next-line jest/no-standalone-expect
      await expect(loginProv.page).toEqualText(
        '.e2e-video-visit-text',
        'Waiting on other party to Join...'
      )
      // eslint-disable-next-line jest/no-standalone-expect
      await expect(loginFac.page).toEqualText(
        '.e2e-video-visit-text',
        'Waiting on other party to Join...'
      )

      const [provPage] = await Promise.all([
        loginProv.context.waitForEvent('page'),
        await loginProv.page.click('text="Open Video Visit"'),
      ])
      await loginFac.page.waitForSelector(
        '.e2e-video-visit-text >> "GSH Provider, PA Has Joined the Visit"'
      )
      // eslint-disable-next-line jest/no-standalone-expect
      await expect(loginFac.page).toEqualText(
        '.e2e-video-visit-text',
        'GSH Provider, PA Has Joined the Visit'
      )
      await provPage.close()
      await loginProv.page.close()
      await loginFac.page.close()
    }
  )

  it('allows a facilitator and a provider to open the visit and update the status', async () => {
    await expect(loginProv.page).toEqualText(
      '.e2e-video-visit-text',
      'Waiting on other party to Join...'
    )
    await expect(loginFac.page).toEqualText(
      '.e2e-video-visit-text',
      'Waiting on other party to Join...'
    )

    const [provPage] = await Promise.all([
      loginProv.context.waitForEvent('page'),
      await loginProv.page.click('text="Open Video Visit"'),
    ])
    const [facPage] = await Promise.all([
      loginFac.context.waitForEvent('page'),
      await loginFac.page.click('text="Open Video Visit"'),
    ])

    await new VisitDetails(loginFac.page).waitForDataRefresh(
      loginFac.page.url()
    )

    await loginFac.page.waitForSelector(
      '.e2e-video-visit-text >> "Video visit in progress"'
    )

    await expect(loginFac.page).toEqualText(
      '.e2e-video-visit-text',
      'Video visit in progress'
    )
    await loginProv.page.waitForSelector(
      '.e2e-video-visit-text >> "Video visit in progress"'
    )

    await expect(loginProv.page).toEqualText(
      '.e2e-video-visit-text',
      'Video visit in progress'
    )
    await provPage.close()
    await facPage.close()
  })

  itif(process.env.NEXT_PUBLIC_PROXY)(
    'allows a facilitator and a provider to open the visit and close the visit with the correct status returning',
    async () => {
      // eslint-disable-next-line jest/no-standalone-expect
      await expect(loginProv.page).toEqualText(
        '.e2e-video-visit-text',
        'Waiting on other party to Join...'
      )
      // eslint-disable-next-line jest/no-standalone-expect
      await expect(loginFac.page).toEqualText(
        '.e2e-video-visit-text',
        'Waiting on other party to Join...'
      )

      const [provPage] = await Promise.all([
        loginProv.context.waitForEvent('page'),
        await loginProv.page.click('text="Open Video Visit"'),
      ])
      const [facPage] = await Promise.all([
        loginFac.context.waitForEvent('page'),
        await loginFac.page.click('text="Open Video Visit"'),
      ])

      await loginFac.page.waitForSelector(
        '.e2e-video-visit-text >> "Video visit in progress"'
      )
      // eslint-disable-next-line jest/no-standalone-expect
      await expect(loginFac.page).toEqualText(
        '.e2e-video-visit-text',
        'Video visit in progress'
      )

      await loginProv.page.waitForSelector(
        '.e2e-video-visit-text >> "Video visit in progress"'
      )
      // eslint-disable-next-line jest/no-standalone-expect
      await expect(loginProv.page).toEqualText(
        '.e2e-video-visit-text',
        'Video visit in progress'
      )
      const provPopup = new VideoPopup(provPage)
      const facPopup = new VideoPopup(facPage)

      await provPopup.clickExitButton()
      await facPopup.clickExitButton()
      await provPopup.page.waitForSelector(
        '"You have disconnected from the call."'
      )
      await facPopup.page.waitForSelector(
        '"You have disconnected from the call."'
      )
      // eslint-disable-next-line jest/no-standalone-expect
      await expect(provPopup.page).toEqualText(
        'p',
        'You have disconnected from the call.'
      )
      // eslint-disable-next-line jest/no-standalone-expect
      await expect(facPopup.page).toEqualText(
        'p',
        'You have disconnected from the call.'
      )

      await facPopup.page.close()
      await provPopup.page.close()

      await loginProv.page.waitForSelector(
        '.e2e-video-visit-text >> "Waiting on other party to Join..."'
      )
      // eslint-disable-next-line jest/no-standalone-expect
      await expect(loginProv.page).toEqualText(
        '.e2e-video-visit-text',
        'Waiting on other party to Join...'
      )
      await loginFac.page.waitForSelector(
        '.e2e-video-visit-text >> "Waiting on other party to Join..."'
      )
      // eslint-disable-next-line jest/no-standalone-expect
      await expect(loginFac.page).toEqualText(
        '.e2e-video-visit-text',
        'Waiting on other party to Join...'
      )
    }
  )
})
