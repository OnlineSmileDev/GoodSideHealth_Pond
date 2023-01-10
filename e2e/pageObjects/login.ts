import { Page, BrowserContext, Browser, chromium } from 'playwright'

interface Persona {
  name: string
  username: string
  password: string
}

export default class Login {
  context: BrowserContext
  page: Page
  emailPlaceholder: string
  passwordPlaceholder: string
  browser: Browser

  constructor(browser: Browser) {
    this.context = context
    this.page = page
    this.emailPlaceholder = 'Your Email Address'
    this.passwordPlaceholder = 'Your Password'
    this.browser = browser || undefined
  }

  personas: Persona[] = [
    { name: 'provider', username: providerEmail, password: '1@3Test!' },
    {
      name: 'facilitator',
      username: facilitatorEmail,
      password: loginPassword,
    },
    { name: 'testadmin', username: testAdminEmail, password: loginPassword },
    {
      name: 'testscheduler',
      username: testSchedulerEmail,
      password: loginPassword,
    },
    {
      name: 'schooladmin',
      username: schoolAdminEmail,
      password: loginPassword,
    },
  ]

  async createPage() {
    this.context = await this.browser.newContext()
    this.context.grantPermissions(['camera', 'microphone'])
    this.page = await this.context.newPage()
  }

  async createChromiumPage() {
    this.browser = await chromium.launch({
      args: [
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream',
      ],
    })
    this.context = await this.browser.newContext()
    this.page = await this.context.newPage()
  }

  async navigate() {
    await this.page.goto(URL_BASE)
  }

  async navigateToHome() {
    await this.page.goto(URL_BASE)
    if (process.env.NEXT_PUBLIC_PROXY) {
      // await this.page.waitForNavigation()
    }
  }

  async fillEmailInput(email: string) {
    await this.page.fill(`input[placeholder="${this.emailPlaceholder}"]`, email)
  }

  async fillPasswordInput(password: string) {
    await this.page.fill(
      `input[placeholder="${this.passwordPlaceholder}"]`,
      password
    )
  }

  async submitLogin() {
    await this.page.waitForLoadState('networkidle')
    await this.page.click('#btn-login')
  }

  async loginAs(persona: string) {
    const [credentials] = this.personas.filter((p) => p.name === persona)

    if (!credentials) throw new Error(`${persona} is not a defined persona.`)

    await this.fillEmailInput(credentials.username)
    if (credentials.username === 'automateF@test.com')
      await this.fillPasswordInput('tEst@578')
    else await this.fillPasswordInput(credentials.password)
    await this.submitLogin()
  }
}
