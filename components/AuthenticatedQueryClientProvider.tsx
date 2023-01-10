import { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { QueryClientProvider, QueryClient } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { selectJwtToken, setToken } from '../src/infrastructure/userContext'

// QueryClient acts as a global cache, so it's important to keep this outside of the scope of React.
const queryClient = new QueryClient()

interface AuthenticatedQueryClientProviderProps {
  children?: ReactNode
}

/**
 * Provide a configured React Query client that enriches all default queries with authorization.
 */
export default function AuthenticatedQueryClientProvider({
  children,
}: AuthenticatedQueryClientProviderProps) {
  const { getAccessTokenSilently } = useAuth0()
  const token = useSelector(selectJwtToken)
  const dispatch = useDispatch()

  // TODO: Decide if this is an appropriate implementation:
  // The thought process here is to provide a reference to getAccessTokenSilently while retaining a long-lived QueryClient.
  useEffect(() => {
    if (!token) {
      ;(async () => {
        const token = await getAccessTokenSilently()
        dispatch(setToken(token))
      })()

      return
    }
  }, [dispatch, token, getAccessTokenSilently])

  useEffect(() => {
    if (token)
      queryClient.setDefaultOptions({
        queries: {
          queryFn: async function ({ queryKey }) {
            // This fetch assumes we're making calls against the same domain.
            // TODO: Fixme with types
            // @ts-ignore
            const res = await fetch(queryKey, {
              headers: { Authorization: `Bearer ${token}` },
            })

            if (!res.ok) throw new Error(await res.json())

            return res.json()
          },
        },
      })
  }, [token])

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
