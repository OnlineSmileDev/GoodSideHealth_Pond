import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  global: 0,
}

const slice = createSlice({
  name: 'busyIndicator',
  initialState,
  reducers: {
    incrementBusyIndicator(state, action) {
      if (action.payload) {
        if (!state[action.payload]) {
          state[action.payload] = 1
        } else {
          state[action.payload]++
        }
        return
      }

      state.global++
    },
    decrementBusyIndicator(state, action) {
      if (action.payload) {
        if (!action.payload) {
          throw new Error('Attempted to decrement an empty busy indicator')
        } else {
          state[action.payload] = Math.max(state[action.payload] - 1, 0)
        }
        return
      }

      if (!state.global) {
        throw new Error('Attempted to decrement an empty busy indicator')
      }

      state.global = Math.max(state.global - 1, 0)
    },
  },
})

export default slice

export const { name, actions, reducer } = slice
