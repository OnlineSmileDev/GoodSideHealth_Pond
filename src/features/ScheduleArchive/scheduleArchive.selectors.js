import slice from './scheduleArchive.slice'

export const selectSlice = (state) => state[slice.name]

export const selectScheduleArchiveData = (state) =>
  selectSlice(state).scheduleArchiveData

export const selectSelectedScheduleArchiveModal = (state) =>
  selectSlice(state).selectedScheduleArchiveModal

export const selectSchedulePatients = (state) =>
  selectSlice(state).schedulePatients

export const selectSelectedPatient = (state) =>
  selectSlice(state).selectedPatient

export const selectSelectedSession = (state) =>
  selectSlice(state).selectedSession

export const selectScheduledVisits = (scheduleId) => (state) =>
  selectSlice(state).scheduledVisits[scheduleId]

export const selectScheduleArchiveFilters = (state) =>
  selectSlice(state).filters

export const selectSchedulePatientDetailFilter = (state) =>
  selectSlice(state).schedulePatientDetailFilter

export const selectScheduleVisitSessionFilter = (state) =>
  selectSlice(state).scheduleVisitSessionFilter
