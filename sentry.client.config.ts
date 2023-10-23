// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import getConfig from 'next/config'
import JSzip from 'jszip'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: 'production',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  maxBreadcrumbs: 15,

  normalizeDepth: 100,

  initialScope: {
    tags: {
      version: getConfig().publicRuntimeConfig.NEXT_PUBLIC_PROJECT_VERSION,
      last_build_time: new Date(getConfig().publicRuntimeConfig.NEXT_PUBLIC_PROJECT_LAST_BUILD_DATE).toLocaleString(),
    },
  },

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    new Sentry.Replay({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  async beforeSend(event, hint) {
    const order = event.contexts?.put_body || event.contexts?.order
    if (order) {
      order?.database?.wells?.forEach(well => {
        well.shafts?.forEach(shaft => {
          shaft?.documents?.forEach(document => {
            document.base64 && (document.base64 = true)
          })
          shaft?.mediaFiles?.forEach(mediaFile => {
            mediaFile.base64 && (mediaFile.base64 = true)
          })
        })
      })
    }

    /***
     * Все данные в объекте context относящиеся к заявке будут заархивированы и отправленны в sentry, как attachments
     ***/
    const attachment = {}

    for (const contextKey in event.contexts) {
      if (/order/i.test(contextKey)) {
        attachment[contextKey] = event.contexts[contextKey]
        delete event.contexts[contextKey]
      }
    }

    if (Object.keys(attachment).length) {
      const zip = new JSzip()
      zip.file('orders.zip', JSON.stringify(attachment))
      await zip.generateAsync({ type: 'uint8array' }).then(content => {
        hint.attachments = [...(hint.attachments || []), { filename: 'orders.zip', data: content }]
      })
    }

    if (event.user) {
      delete event.user?.roles
    }

    return event
  },
})
