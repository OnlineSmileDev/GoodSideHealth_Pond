import ReactGA from 'react-ga'

const TRACKING_ID = process.env.NEXT_PUBLIC_GTAG

const init = () => {
  const isDev = process.env.NODE_ENV !== 'production'
  ReactGA.initialize(TRACKING_ID, { debug: isDev })
}
// Current unused but may be useful in the future
const sendEvent = (payload) => {
  ReactGA.event(payload)
}

const sendPageView = (path) => {
  ReactGA.set({ page: path })
  ReactGA.pageview(path)
}

const analytics = {
  init,
  sendEvent,
  sendPageView,
}

export default analytics
