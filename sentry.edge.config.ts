// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import getConfig from 'next/config'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: 'production',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  normalizeDepth: 100,

  initialScope: {
    tags: {
      version: getConfig().publicRuntimeConfig.NEXT_PUBLIC_PROJECT_VERSION,
      last_build_time: new Date(getConfig().publicRuntimeConfig.NEXT_PUBLIC_PROJECT_LAST_BUILD_DATE).toLocaleString(),
    },
  },

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
})
