import { createSlice } from '@reduxjs/toolkit'
import { USER_STATUS } from 'constants/users'
import * as asyncActions from './users.asyncActions'
import userContext from '../../infrastructure/userContext/userContext.slice'

const initialState = {
  user: { status: USER_STATUS.PENDING },
  enrollmentDetails: {},
}

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    changeUser(state, action) {
      state.user = action.payload
    },
    addUserRole(state, action) {
      state.user.role = action.payload
    },
  },
  extraReducers: {
    [asyncActions.fetchUser.fulfilled]: (state, action) => {
      if (action.payload)
        state.user = {
          ...state.user,
          ...action.payload,
          status: USER_STATUS.APPROVED,
        }
    },
    [asyncActions.updateUser.fulfilled]: (state, action) => {
      if (action.payload)
        state.user = {
          ...state.user,
          ...action.payload,
          status: USER_STATUS.APPROVED,
        }
    },
    [asyncActions.createUser.fulfilled]: (state, action) => {
      if (action.payload)
        state.user = {
          ...state.user,
          ...action.payload,
          status: USER_STATUS.APPROVED,
        }
    },
    [asyncActions.fetchUserEnrollmentDetails.fulfilled]: (state, action) => {
      if (action.payload) {
        state.enrollmentDetails = {
          ...state.enrollmentDetails,
          ...action.payload,
        }
      }
    },
    [userContext.actions.updateUser]: (state, action) => {
      state.user = {
        ...state.user,
        role: action.payload.role,
      }
    },
  },
})

export default slice

export const { name, actions, reducer } = slice
