const PlaywrightEnvironment =
  require('jest-playwright-preset/lib/PlaywrightEnvironment').default

if (process.env.DD_ENV === 'ci') {
  require('dd-trace/ci/jest/env')
}

module.exports = PlaywrightEnvironment
