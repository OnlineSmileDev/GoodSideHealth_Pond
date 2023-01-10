import slice from './visitItem.slice'
export const selectSlice = (state) => state[slice.name]

export const selectVisitDetails = (state) => selectSlice(state).visitDetails

export const selectSelectedOrder = (state) => selectSlice(state).selectedOrder

export const selectPatientVisitDetails = (state) =>
  selectSlice(state).patientVisitDetails

export const selectSelectedMiddlePanelModal = (state) =>
  selectSlice(state).selectedMiddlePanelModal

export const selectSelectedDischargeNoteModal = (state) =>
  selectSlice(state).selectedDischargeNoteModal

export const selectSelectedVisitItemModal = (state) =>
  selectSlice(state).selectedVisitItemModal

export const selectLocations = (state) => selectSlice(state).locations

export const selectPatients = (state) => selectSlice(state).patients

export const selectSelectedLocation = (state) =>
  selectSlice(state).selectedLocation

export const selectVisitReasons = (state) => selectSlice(state).visitReasons

export const selectVisitActivities = (state) =>
  selectSlice(state).VisitActivities

export const selectVideoInvitations = (state) =>
  selectSlice(state).VideoInvitations

export const selectSelectedInvitation = (state) =>
  selectSlice(state).selectedInvitation

export const selectLastCompletedPhq = (state) =>
  selectSlice(state).lastCompletedPhq
