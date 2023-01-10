module.exports = {
  extends: [
    '../.eslintrc.json',
    'plugin:jest-playwright/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['global.d.ts'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
}
