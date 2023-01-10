import slice from './patients.slice'

export const selectSlice = (state) => state[slice.name]

export const selectPatients = (state) => selectSlice(state).patients

export const selectPatientFilters = (state) => selectSlice(state).patientFilters

export const selectPatientCount = (state) => selectSlice(state).patientCount

export const selectSelectedPatientModal = (state) =>
  selectSlice(state).selectedPatientModal
