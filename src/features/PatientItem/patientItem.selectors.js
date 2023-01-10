import slice from './patientItem.slice'

export const selectSlice = (state) => state[slice.name]

export const selectPatientDetails = (state) => selectSlice(state).patientDetails

export const selectFilters = (state) => selectSlice(state).filters

export const selectPatientVisits = (state) => selectSlice(state).patientVisits

export const selectVisitCount = (state) => selectSlice(state).visitCount

export const selectLocations = (state) => selectSlice(state).locations

export const selectOrganizations = (state) => selectSlice(state).organizations
