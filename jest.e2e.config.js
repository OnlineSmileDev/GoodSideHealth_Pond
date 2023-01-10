const path = require('path')
module.exports = {
  preset: 'jest-playwright-preset',
  testEnvironment: '<rootDir>/testEnvironment.e2e.js',
  rootDir: 'e2e',
  // if time outs are needed, this sets a global option
  testTimeout: 100 * 1000,
  testSequencer: path.resolve(__dirname, 'CustomSequencer.ts'),
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironmentOptions: {
    'jest-playwright': {
      // TODO: Determine if we want to run against chromium or webkit and if we want to add a device size
      browsers: ['chromium'], // 'firefox', 'webkit'],
    },
  },
  globals: {
    URL_BASE: process.env.URL_BASE ?? 'http://localhost:3000',
    CLAIM_VISIT_REQUEST_SEARCH_INPUT: 'tristia',
    PATIENT_NAME: 'Tristian Asani',
    PATIENT_EMAIL: 'tristian@example.com',
    SCHOOL: 'DUNCANVILLE HIGH SCHOOL',
    SESSION_TYPE: 'Rapid SARS Antigen Test (COVID-19)',
    SCHOOL_SEARCH_INPUT: 'du',
    providerEmail: 'provider@test.com',
    facilitatorEmail: 'automateF@test.com',
    testAdminEmail: 'automateta@test.com',
    testSchedulerEmail: 'automatets@test.com',
    schoolAdminEmail: 'automatesa@test.com',
    loginPassword: 'GAomM1120!',
  },
}
