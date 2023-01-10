import * as selectors from './userContext.selectors'
import slice from './userContext.slice'
import WithRestrictedAccess from './WithRestrictedAccess'

export const {
  name,
  actions: { setToken, setIsAuthenticated, updateUser },
  reducer,
} = slice

export const {
  selectIsAuthenticated,
  selectCurrentUserHasPermissions,
  selectUserContext,
  selectJwtToken,
} = selectors

export { WithRestrictedAccess }
