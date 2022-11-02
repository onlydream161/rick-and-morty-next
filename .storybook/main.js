const nextConfig = require('../next.config')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  typescript: { reactDocgen: false },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'msw-storybook-addon',
    'storybook-addon-jotai',
    'storybook-addon-next',
    'storybook-addon-next-router',
    'storybook-react-i18next',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  staticDirs: ['../public'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  env: config => ({ ...config, STORYBOOK_ENV: true }),
  webpackFinal: async baseConfig => {
    const fileLoaderRule = baseConfig.module.rules.find(rule => rule.test?.test('.svg'))
    fileLoaderRule.exclude = /\.svg$/
    nextConfig.baseConfig.webpack(baseConfig)
    baseConfig.resolve.plugins = [new TsconfigPathsPlugin()]
    baseConfig.resolve.alias = {
      ...baseConfig.resolve.alias,
      'next-i18next': 'react-i18next',
    }
    return baseConfig
  },
}
