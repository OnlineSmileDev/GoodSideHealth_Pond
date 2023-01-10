import { setTag, captureMessage } from '@sentry/react'

// https://docs.sentry.io/platforms/javascript/guides/react/enriching-error-data/additional-data/adding-tags/
export const addTagSentry = (key, value) => setTag(key, value)

// https://docs.sentry.io/platforms/javascript/guides/react/#capture-errors
// TODO: Not sure if this is useful because the docs seem to indicate the react package takes care of this, it might be beneficial to add a tag though
export const captureMessageSentry = (message) => captureMessage(message)
