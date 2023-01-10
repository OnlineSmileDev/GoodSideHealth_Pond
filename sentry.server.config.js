// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn:
    SENTRY_DSN ||
    'https://c74903878ed140e28db9c9e079ecc12b@o440254.ingest.sentry.io/5415310',
  // Adjust this value in production, or use tracesSampler for greater control
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
  tracesSampler: (samplingContext) => {
    if (
      samplingContext.request?.headers?.['user-agent']?.includes(
        'ELB-HealthChecker/2.0'
      )
    ) {
      return 0
    }

    return 0.25 // tracesSampleRate
  },
})
