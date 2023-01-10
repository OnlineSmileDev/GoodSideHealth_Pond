import * as selectors from './users.selectors'
import * as asyncActions from './users.asyncActions'
import slice from './users.slice'

export const {
  name,
  reducer,
  actions: { changeUser },
} = slice

export const { fetchUser, updateUser } = asyncActions

export const { selectUserDetails } = selectors
