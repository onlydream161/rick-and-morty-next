const nextConfig = require('../next.config')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  typescript: { reactDocgen: false },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-next',
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
  ...Object.keys(process.env).reduce(
    (acc, el) => {
      acc[el.startsWith('NEXT_PUBLIC_') ? 'publicRuntimeConfig' : 'serverRuntimeConfig'][el] = process.env[el]
      return acc
    },
    { serverRuntimeConfig: {}, publicRuntimeConfig: {} }
  ),
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async baseConfig => {
    const fileLoaderRule = baseConfig.module.rules.find(rule => rule.test?.test('.svg'))
    fileLoaderRule.exclude = /\.svg$/
    nextConfig.webpack(baseConfig)
    baseConfig.resolve.plugins = [new TsconfigPathsPlugin()]
    baseConfig.resolve.alias = {
      ...baseConfig.resolve.alias,
      'next-i18next': 'react-i18next',
    }
    return baseConfig
  },
}
