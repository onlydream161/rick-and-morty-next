// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
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
