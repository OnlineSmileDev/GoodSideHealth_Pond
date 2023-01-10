const nextJest = require('next/jest')
const path = require('path')

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = nextJest()({
  clearMocks: false,
  testEnvironment: '<rootDir>/testEnvironment.js',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.js',
  },
  roots: ['<rootDir>/src', '<rootDir>/components', '<rootDir>/pages'],
  collectCoverageFrom: [
    '<rootDir>/{src,pages,utils,hooks,components}/**/*.{js,ts,tsx}',
  ],
  moduleDirectories: ['node_modules', path.join(__dirname, '.')],
  setupFiles: ['<rootDir>/.jest/envVars.js', 'jest-canvas-mock'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
})
