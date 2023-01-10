import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: null,
}

const slice = createSlice({
  name: 'userContext',
  initialState,
  reducers: {
    updateUser(state, action) {
      state = { ...state, ...action.payload }
      return state
    },
    setToken(state, action) {
      state.jwtToken = action.payload
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload
    },
  },
})

export default slice

export const { name, actions, reducer } = slice
