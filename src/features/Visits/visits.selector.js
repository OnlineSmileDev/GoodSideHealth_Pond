import slice from './visits.slice'

export const selectSlice = (state) => state[slice.name]

export const selectSelectedVisit = (state) => selectSlice(state).selectedVisit

export const selectSelectedVisitModal = (state) =>
  selectSlice(state).selectedVisitModal

export const selectVisits = (state) => selectSlice(state).visits

export const selectVisitsFilters = (state) => selectSlice(state).visitsFilters

export const selectSessionsFilters = (state) =>
  selectSlice(state).sessionsFilters

export const selectProviderVisit = (state) => selectSlice(state).providerVisit

export const selectVisitsAndSessionFilters = (state) =>
  selectSlice(state).visitsAndSessionFilters
