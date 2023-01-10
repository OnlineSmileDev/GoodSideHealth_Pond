import { ReactNode, useEffect, useState } from 'react'
import { FlagsProvider } from 'flagged'
import { useQuery } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { useRouter } from 'next/router'
import { populateFeatures } from 'utils/populateFeatures'

interface UserFlagsProviderProps {
  children?: ReactNode
}

// TODO: Lift typings out to somewhere more useful
interface User {
  id?: number
  organizationId?: number
}

/**
 * Provide feature flags
 */
export default function UserFlagsProvider({
  children,
}: UserFlagsProviderProps) {
  const [basicFeatures] = useState(
    JSON.parse(process.env.NEXT_PUBLIC_FEATURE_FLAGS)
  )
  const [features, setFeatures] = useState(null)
  const { user } = useAuth0()
  const { pathname } = useRouter()
  const isUserOnboarding = pathname === '/registration'
  // TODO: Remove dependency on user query entirely after Auth0 JWT provides organizationId context.
  const { data, isLoading } = useQuery<User>('/api/users/1', {
    enabled: !isUserOnboarding,
  })

  useEffect(() => {
    if (isLoading) return

    const { id: userId, organizationId } = data || {}

    const role =
      (user && user[`${process.env.NEXT_PUBLIC_JWT_AUDIENCE}/user`]?.role) ??
      null

    const updatedFeatures = populateFeatures(
      basicFeatures,
      userId,
      organizationId,
      role
    )

    setFeatures(updatedFeatures)
  }, [user, data, basicFeatures, isLoading])

  return features ? (
    <FlagsProvider features={features}>{children}</FlagsProvider>
  ) : null
}
