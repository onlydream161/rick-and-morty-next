const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching,
  disable: process.env.NODE_ENV === 'development',
})
const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  swcMinify: true,
  ...Object.keys(process.env).reduce(
    (acc, el) => {
      acc[el.startsWith('NEXT_PUBLIC_') ? 'publicRuntimeConfig' : 'serverRuntimeConfig'][el] = process.env[el]
      return acc
    },
    { serverRuntimeConfig: {}, publicRuntimeConfig: {} }
  ),
  output: 'standalone',
  i18n,
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      loader: '@svgr/webpack',
    })
    return config
  },
}

module.exports = withPWA({ ...baseConfig, baseConfig })
