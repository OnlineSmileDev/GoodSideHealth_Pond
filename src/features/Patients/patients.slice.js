import { createSlice } from '@reduxjs/toolkit'
import * as asyncActions from './patients.asyncActions'
import {
  SIZE_PER_PAGE,
  ALL_LOCATIONS,
  ALL_ORGANIZATIONS,
} from './patients.constants'

const defaultPatientFilters = { page: 1, limit: SIZE_PER_PAGE }
const defaultPatients = []
const initialPatientFilters = {
  ...defaultPatientFilters,
  locationId: ALL_LOCATIONS.id,
  organizationId: ALL_ORGANIZATIONS.id,
}

const initialState = {
  patients: defaultPatients,
  patientFilters: initialPatientFilters,
  patientCount: {},
  selectedPatientModal: null,
}

const slice = createSlice({
  name: 'patientArchive',
  initialState,
  reducers: {
    setPatientFilters(state, action) {
      state.patientFilters = {
        ...state.patientFilters,
        ...action.payload,
      }
    },
    resetPatientFilters(state) {
      state.patientFilters = initialPatientFilters
    },
    setSelectedPatientModal(state, action) {
      state.selectedPatientModal = action.payload
    },
  },
  extraReducers: {
    [asyncActions.fetchPatientArchive.fulfilled]: (state, action) => {
      state.patients = action.payload || defaultPatients
    },
    [asyncActions.fetchPatientCount.fulfilled]: (state, action) => {
      state.patientCount = action.payload
    },
  },
})

export default slice

export const { name, actions, reducer } = slice
