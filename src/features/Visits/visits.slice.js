import { createSlice } from '@reduxjs/toolkit'
import { getDateWithTZRanges, getLastMonthWithTZRanges } from 'utils/datePicker'
import { PROVIDER_VISIT_TYPE } from 'constants/visits'
import * as asyncActions from './visits.asyncActions'

const defaultValues = {
  visitsAndSessionFilters: {
    date: getDateWithTZRanges(new Date()),
    getExtendedData: true,
  },
  visits: [],
  visitsFilters: {
    getExtendedData: true,
    // TODO: Rely on a more flexible solution
    // Used for Provider Queue query limitation to 1 month
    date: getLastMonthWithTZRanges(new Date()),
  },
  sessionsFilters: {
    date: getDateWithTZRanges(new Date()),
    getExtendedData: true,
    sort: 'sessionStartDate,sessionTime',
    order: 'DESC',
  },
}

const initialState = {
  selectedVisit: '',
  selectedVisitModal: null,
  visits: [],
  visitsFilters: {
    getExtendedData: true,
    // TODO: Rely on a more flexible solution
    // Used for Provider Queue query limitation to 1 month
    date: getLastMonthWithTZRanges(new Date()),
  },
  sessionsFilters: {
    date: getDateWithTZRanges(new Date()),
    getExtendedData: true,
    sort: 'sessionStartDate,sessionTime',
    order: 'DESC',
  },
  visitsAndSessionFilters: {
    date: getDateWithTZRanges(new Date()),
    getExtendedData: true,
  },
  providerVisit: PROVIDER_VISIT_TYPE.ON_DEMAND_VISITS,
}
const slice = createSlice({
  name: 'visits',
  initialState,
  reducers: {
    saveSelectedVisit(state, action) {
      state.selectedVisit = action.payload
    },
    setSelectedVisitModal(state, action) {
      state.selectedVisitModal = action.payload
    },
    setVisitsFilters(state, action) {
      state.visitsFilters = { ...state.visitsFilters, ...action.payload }
    },
    setSessionsFilters(state, action) {
      state.sessionsFilters = { ...state.sessionsFilters, ...action.payload }
    },
    resetVisitsAndSessionFilters(state) {
      state.visitsAndSessionFilters = defaultValues.visitsAndSessionFilters
    },
    resetVisitsFilters(state) {
      state.visitsFilters = defaultValues.visitsFilters
    },
    resetSessionsFilters(state) {
      state.sessionsFilters = defaultValues.sessionsFilters
    },
    setVisitsAndSessionFilters(state, action) {
      state.visitsAndSessionFilters = {
        ...state.visitsAndSessionFilters,
        ...action.payload,
      }
    },
    setProviderVisit(state, action) {
      state.providerVisit = action.payload || initialState.providerVisit
    },
    setVisits(state, action) {
      const visits = action.payload?.map(
        ({ location, organization, ...visit }) => {
          const organizationName = visit.organizationName || organization?.name
          const state = visit.state || organization?.state
          const locationName = visit.locationName || location?.name
          return { organizationName, locationName, state, ...visit }
        }
      )

      state.visits = visits || initialState.visits
    },
    resetVisits(state) {
      state.visits = defaultValues.visits
    },
  },
  extraReducers: {
    [asyncActions.fetchVisits.fulfilled]: (state, action) => {
      state.visits = action.payload || initialState.visits
    },
  },
})

export default slice
export const { name, actions, reducer } = slice
