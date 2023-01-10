import { useState, useEffect, ReactNode } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useRouter } from 'next/router'

interface AuthenticatedProps {
  children?: ReactNode
}

/**
 * This serves as a general wrapper to ensure we have a signed-in user before mounting the rest of the app.
 */
export default function Authenticated({ children }: AuthenticatedProps) {
  const router = useRouter()
  const [hasSiteLoaded, setSiteStatus] = useState(false)
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()
  const pathname = typeof window !== 'undefined' && window.location.pathname
  const isSignup = router.pathname === '/registration'

  useEffect(() => {
    if (isLoading || isAuthenticated || !router.isReady) {
      if (isAuthenticated) setSiteStatus(true)
      return
    }
    ;(async () => {
      // Perform login, but pass signup hint to Auth0 page and ensure we return to the registration route
      if (isSignup && router.query.enrollmentId)
        return await loginWithRedirect({
          fragment: 'signup',
          appState: {
            returnTo: `/registration?enrollmentId=${router.query.enrollmentId}`,
          },
        })
      await loginWithRedirect({
        appState: {
          returnTo: pathname,
        },
      })
    })()
  }, [
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    router,
    isSignup,
    pathname,
  ])

  return hasSiteLoaded ? <>{children}</> : <></>
}
