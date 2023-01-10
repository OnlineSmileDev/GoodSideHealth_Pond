import Login from '../pageObjects/login'

describe('log in', () => {
  const loginPage = new Login(browser)

  beforeEach(async () => {
    await loginPage.navigate()
  })

  it('requires you to log in upon visiting the site', async () => {
    await loginPage.page.waitForSelector('"Login"')
    expect(page.url()).toContain('auth')
  })

  it('allows a user to log in', async () => {
    await loginPage.loginAs('provider')
    await loginPage.page.waitForNavigation({ waitUntil: 'domcontentloaded' })
    expect(page.url()).not.toContain('auth')
  })
})
