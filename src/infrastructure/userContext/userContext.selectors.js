import slice from './userContext.slice'

export const selectSlice = (state) => state[slice.name]

export const selectUserContext = (state) => selectSlice(state)

export const selectJwtToken = (state) => selectUserContext(state).jwtToken

export const selectIsAuthenticated = (state) => {
  const userContext = selectUserContext(state)
  return userContext.isAuthenticated && userContext.permissions
}

export const selectCurrentUserHasPermissions = (state) => (permissions) =>
  userHasPermissions(permissions, state)

function userHasPermissions(permissions, state) {
  if (!permissions || !permissions.length) {
    return true
  }

  const userContext = selectUserContext(state)

  if (
    !userContext ||
    !userContext.permissions ||
    !userContext.permissions.length
  ) {
    return false
  }

  return !!userContext.permissions.find((userPermission) =>
    permissions.find(
      (requiredPermission) => requiredPermission === userPermission
    )
  )
}
