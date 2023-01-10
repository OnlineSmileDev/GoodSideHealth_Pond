import slice from './visitSession.slice'
import { get } from 'utils/get'

export const selectSlice = (state) => state[slice.name]

export const selectVisitSession = (state) =>
  get(selectSlice(state), 'visitSession.data')

export const selectSessionSummary = (state) =>
  get(selectSlice(state), 'visitSession.summary')

export const selectSelectedVisitSessionModal = (state) =>
  selectSlice(state).selectedVisitSessionModal

export const selectSelectedSessionVisit = (state) =>
  selectSlice(state).selectedSessionVisit

export const selectSessionFilters = (state) => selectSlice(state).filters
