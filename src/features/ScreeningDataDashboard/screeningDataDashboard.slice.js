import { createSlice } from '@reduxjs/toolkit'
import { getIsoString } from 'utils/datePicker'
import * as asyncActions from './screeningDataDashboard.asyncActions'
import {
  RECORDS_PER_PAGE,
  SCREENING_DEFAULT_VALUES,
} from './screeningDataDashboard.constants'

const defaultCertifyStudentForm = {
  locations: [],
  departments: [
    {
      id: 0,
      organizationId: 0,
      name: SCREENING_DEFAULT_VALUES.ALL_GRADES_AND_DEPARTMENTS,
    },
  ],
  students: [],
  selectedLocation: {},
  patients: [],
  organizations: [],
}

const defaultDashBoardFilters = {
  date: getIsoString(new Date()),
}

const initialState = {
  screeningReport: { data: [], meta: {} },
  screeningThisWeekCount: [],
  screeningCounts: [],
  locationSubmission: [],
  dashboardFilters: {
    ...defaultDashBoardFilters,
  },
  submissionFilters: { page: 1, limit: RECORDS_PER_PAGE.TOTAL_SUBMISSION },
  selectedModal: '',
  students: [],
  ...defaultCertifyStudentForm,
}

const slice = createSlice({
  name: 'screeningDashboard',
  initialState,
  reducers: {
    saveSelectedLocation(state, action) {
      state.selectedLocation = action.payload
    },
    resetCertifyStudentForm(state) {
      state.locations = defaultCertifyStudentForm.locations
      state.students = defaultCertifyStudentForm.student
      state.selectedLocation = defaultCertifyStudentForm.selectedLocation
    },
    setDashboardFilters(state, action) {
      state.dashboardFilters = { ...state.dashboardFilters, ...action.payload }
    },
    setSubmissionFilters(state, action) {
      state.submissionFilters = {
        ...state.submissionFilters,
        ...action.payload,
      }
    },
    saveSelectedModal(state, action) {
      state.selectedModal = action.payload
    },
  },
  extraReducers: {
    [asyncActions.fetchScreeningReports.fulfilled]: (state, action) => {
      state.screeningReport = action.payload || initialState.screeningReport
    },
    [asyncActions.fetchScreeningAggregate.fulfilled]: (state, action) => {
      state.screeningThisWeekCount =
        (action.payload && action.payload.thisWeekCount) ||
        initialState.screeningthisWeekCount
      state.screeningCounts =
        (action.payload && action.payload.counts) ||
        initialState.screeningCounts
      state.locationSubmission =
        (action.payload && action.payload.submissionsByCampus) ||
        initialState.locationSubmission
    },
    [asyncActions.fetchLocations.fulfilled]: (state, action) => {
      state.locations = action.payload || defaultCertifyStudentForm.locations
    },
    [asyncActions.fetchOrganizations.fulfilled]: (state, action) => {
      state.organizations =
        action.payload || defaultCertifyStudentForm.organizations
    },
    [asyncActions.fetchDepartments.fulfilled]: (state, action) => {
      state.departments = action.payload
        ? [...defaultCertifyStudentForm.departments, ...action.payload]
        : defaultCertifyStudentForm.departments
    },
    [asyncActions.fetchPatientsForScheduleTest.fulfilled]: (state, action) => {
      state.patients = action.payload || defaultCertifyStudentForm.patients
    },
    [asyncActions.fetchLocationStudents.fulfilled]: (state, action) => {
      state.students = action.payload || defaultCertifyStudentForm.students
    },
  },
})

export default slice

export const { name, actions, reducer } = slice
