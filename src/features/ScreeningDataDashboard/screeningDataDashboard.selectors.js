import slice from './screeningDataDashboard.slice'

export const selectSlice = (state) => state[slice.name]

export const selectScreeningReport = (state) =>
  selectSlice(state).screeningReport

export const selectScreeningThisWeekCount = (state) =>
  selectSlice(state).screeningThisWeekCount

export const selectScreeningCounts = (state) =>
  selectSlice(state).screeningCounts

export const selectScreeningLocationSubmission = (state) =>
  selectSlice(state).locationSubmission

export const selectLocations = (state) => selectSlice(state).locations

export const selectOrganizations = (state) => selectSlice(state).organizations

export const selectDepartments = (state) => selectSlice(state).departments

export const selectStudents = (state) => selectSlice(state).students

export const selectSelectedLocation = (state) =>
  selectSlice(state).selectedLocation

export const selectDashboardFilters = (state) =>
  selectSlice(state).dashboardFilters

export const selectSubmissionFilters = (state) =>
  selectSlice(state).submissionFilters

export const selectSelectedModal = (state) => selectSlice(state).selectedModal

export const selectPatients = (state) => selectSlice(state).patients
