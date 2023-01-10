// TODO: We need to find a good way to handle stylesheets in this project with Next:
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import '../main.css'
import { AppProps } from 'next/app'
import { useRef } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Router from 'next/router'
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react'
import { ReactQueryDevtools } from 'react-query/devtools'
import AuthenticatedQueryClientProvider from '../components/AuthenticatedQueryClientProvider'
import createStore from '../src/createStore'
import rootReducer from '../src/rootReducer'
import UserFlagsProvider from '../components/UserFlagsProvider'
import ReduxCompatibilityProvider from '../components/ReduxCompatbilityProvider'
import Authenticated from '../components/Authenticated'
import ThirdPartyScriptsWrapper from '../components/ThirdPartyScriptsWrapper'

const store = createStore(rootReducer)

const onRedirectCallback = (appState) => {
  Router.replace(appState?.returnTo || '/')
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>Goodside Health</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href={'/favicon.ico'} />
        <link rel='apple-touch-icon' href={'/favicon.ico'} />
      </Head>

      <Script src='https://jq85jj9xrkhl.statuspage.io/embed/script.js' />

      <Provider store={store}>
        <Auth0Provider
          domain={process.env.NEXT_PUBLIC_JWT_DOMAIN}
          clientId={process.env.NEXT_PUBLIC_JWT_CLIENT_ID}
          redirectUri={typeof window !== 'undefined' && window.location.origin}
          audience={process.env.NEXT_PUBLIC_JWT_AUDIENCE}
          onRedirectCallback={onRedirectCallback}
          useRefreshTokens
          cacheLocation='localstorage'
        >
          <Authenticated>
            <AuthenticatedQueryClientProvider>
              <ReduxCompatibilityProvider>
                <UserFlagsProvider>
                  <Component {...pageProps} />
                  {process.env.NODE_ENV !== 'production' && (
                    <ReactQueryDevtools initialIsOpen={false} />
                  )}
                </UserFlagsProvider>
                <ThirdPartyScriptsWrapper />
              </ReduxCompatibilityProvider>
            </AuthenticatedQueryClientProvider>
          </Authenticated>
        </Auth0Provider>
      </Provider>
    </>
  )
}
