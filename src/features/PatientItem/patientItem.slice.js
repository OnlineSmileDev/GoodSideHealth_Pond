import { createSlice } from '@reduxjs/toolkit'
import * as asyncActions from './patientItem.asyncActions'
import { SIZE_PER_PAGE } from '../Patients/patients.constants'

const defaultValues = {
  patientDetail: {},
  filters: {
    page: 1,
    limit: SIZE_PER_PAGE,
  },
  patientVisit: [],
  visitCount: 0,
  locations: [],
  organizations: [],
}

const initialState = {
  patientDetails: defaultValues.patientDetail,
  filters: defaultValues.filters,
  patientVisits: defaultValues.patientVisit,
  visitCount: defaultValues.visitCount,
  locations: [],
  organizations: [],
}

const slice = createSlice({
  name: 'patientItem',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = {
        ...state.filters,
        ...action.payload,
        ...defaultValues.filters,
      }
    },
    setPagination(state, action) {
      state.filters = { ...state.filters, ...action.payload }
    },
    setPatientDetails(state, action) {
      state.patientDetails = { ...state.patientDetails, ...action.payload }
    },
    resetFilters(state) {
      state.filters = defaultValues.filters
    },
    resetPatientVisits(state) {
      state.patientVisits = defaultValues.patientVisit
      state.visitCount = defaultValues.visitCount
    },
  },
  extraReducers: {
    [asyncActions.fetchPatientDetails.fulfilled]: (state, action) => {
      state.patientDetails = action.payload || defaultValues.patientDetail
    },
    [asyncActions.fetchPatientVisits.fulfilled]: (state, action) => {
      const { results, total } = action.payload
      state.patientVisits = results || defaultValues.patientVisit
      state.visitCount = total || defaultValues.visitCount
    },
    [asyncActions.fetchLocations.fulfilled]: (state, action) => {
      state.locations = action.payload || defaultValues.locations
    },
    [asyncActions.fetchOrganizations.fulfilled]: (state, action) => {
      state.organizations = action.payload || defaultValues.organizations
    },
  },
})

export default slice
export const { name, actions, reducer } = slice
