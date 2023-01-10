import { createSlice } from '@reduxjs/toolkit'
import * as asyncActions from './visitSession.asyncActions'

const initialState = {
  visitSession: [],
  selectedVisitSessionModal: null,
  selectedSessionVisit: [],
  filters: {},
}

const slice = createSlice({
  name: 'visitSession',
  initialState,
  reducers: {
    setVisitSessionModal(state, action) {
      state.selectedVisitSessionModal =
        action.payload || initialState.selectedVisitSessionModal
    },
    setSessionFilters(state, action) {
      state.filters = action.payload || initialState.filters
    },
    saveSelectedSessionVisit(state, action) {
      state.selectedSessionVisit =
        action.payload || initialState.selectedSessionVisit
    },
  },
  extraReducers: {
    [asyncActions.fetchVisitSession.fulfilled]: (state, action) => {
      state.visitSession = action.payload || initialState.visitSession
    },
  },
})

export default slice
export const { name, actions, reducer } = slice
