import { ReactNode, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/dist/client/router'
import { USER_STATUS } from 'constants/users'
import {
  selectJwtToken,
  setIsAuthenticated,
  setToken,
  updateUser,
} from '../src/infrastructure/userContext'
import { fetchUser, selectUserDetails } from '../src/features/Users'

interface ReduxCompatibilityProviderProps {
  children?: ReactNode
}

const flattenPermissions = (userToFlatten) => {
  const userWithFlattenedPermissions = { ...userToFlatten }

  const permissionsProperty = `${process.env.NEXT_PUBLIC_JWT_AUDIENCE}/user`
  delete userWithFlattenedPermissions[permissionsProperty]
  userWithFlattenedPermissions.permissions =
    userToFlatten[permissionsProperty].permissions
  userWithFlattenedPermissions.role = userToFlatten[permissionsProperty].role
  return userWithFlattenedPermissions
}

/**
 * @deprecated Provides the user and their auth token to existing code that depends on Redux. Will eventually be removed.
 */
export default function ReduxCompatibilityProvider({
  children,
}: ReduxCompatibilityProviderProps) {
  const { isAuthenticated, user } = useAuth0()
  const { status } = useSelector(selectUserDetails)
  const token = useSelector(selectJwtToken)
  const dispatch = useDispatch()
  const { pathname } = useRouter()

  useEffect(() => {
    dispatch(setIsAuthenticated(isAuthenticated))
  }, [isAuthenticated, dispatch])

  useEffect(() => {
    if (user) dispatch(updateUser(flattenPermissions(user)))
  }, [user, dispatch])

  useEffect(() => {
    if (token) {
      dispatch(
        // @ts-ignore
        fetchUser({
          id: 1, // This really needs to either not exist (use Auth0) or actually fetch the canonical user here...
        })
      )
    }
  }, [dispatch, token])

  const isUserAuthorized = status !== USER_STATUS.PENDING
  const isUserOnboarding = pathname === '/registration'

  const isReady =
    isAuthenticated && user && token && (isUserAuthorized || isUserOnboarding)

  // ToDo: Use Page Preloader
  return isReady ? <>{children}</> : <></>
}
