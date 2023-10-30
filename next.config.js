const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching,
  disable: process.env.NODE_ENV === 'development',
})
const { i18n } = require('./next-i18next.config')
const packageVersion = require('./package.json').version

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  swcMinify: true,
  ...Object.keys(process.env).reduce(
    (acc, el) => {
      acc[el.startsWith('NEXT_PUBLIC_') ? 'publicRuntimeConfig' : 'serverRuntimeConfig'][el] = process.env[el]
      return acc
    },
    {
      serverRuntimeConfig: {},
      publicRuntimeConfig: {
        NEXT_PUBLIC_PROJECT_VERSION: packageVersion,
        NEXT_PUBLIC_PROJECT_LAST_BUILD_DATE: Date.now(),
      },
    }
  ),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['rickandmortyapi.com'],
  },
  output: 'standalone',
  i18n,
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/i,
      type: 'asset',
      resourceQuery: /url/, // *.svg?url
    })
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = withPWA({ ...baseConfig, baseConfig })
