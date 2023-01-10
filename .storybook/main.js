const path = require('path')

module.exports = {
  stories: [
    '../pages/*.stories.(js|jsx|ts|tsx)',
    '../components/**/*.stories.(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, '../'),
    ]

    return config
  },
}
