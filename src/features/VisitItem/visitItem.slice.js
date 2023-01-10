import { createSlice } from '@reduxjs/toolkit'
import { PROVIDER_ORDER_TYPES } from 'constants/orders'
import * as asyncActions from './visitItem.asyncActions'

const defaultRequestVisitForm = {
  locations: [],
  patients: [],
  selectedLocation: {},
  visitReasons: [],
  VisitActivities: [],
  VideoInvitations: [],
  lastCompletedPhq: undefined,
}

const defaultVisitDetails = {}
const defaultPatientVisitDetails = {}

const initialState = {
  visitDetails: defaultVisitDetails,
  patientVisitDetails: {},
  selectedOrder: null,
  selectedInvitation: null,
  selectedVisitItemModal: null,
  selectedMiddlePanelModal: null,
  selectedDischargeNoteModal: null,
  ...defaultRequestVisitForm,
}

const slice = createSlice({
  name: 'visitItem',
  initialState,
  reducers: {
    setSelectedOrder(state, action) {
      state.selectedOrder = action.payload
    },
    setSelectedInvitation(state, action) {
      state.selectedInvitation = action.payload
    },
    setPatientVisitDetails(state, action) {
      state.patientVisitDetails = {
        ...state.patientVisitDetails,
        ...action.payload,
      }
    },
    resetPatientVisitDetails(state) {
      state.patientVisitDetails = defaultPatientVisitDetails
    },
    setSelectedMiddlePanelModal(state, action) {
      state.selectedMiddlePanelModal = action.payload
    },
    setSelectedDischargeNoteModal(state, action) {
      state.selectedDischargeNoteModal = action.payload
    },
    setSelectedVisitItemModal(state, action) {
      state.selectedVisitItemModal = action.payload
    },
    saveSelectedLocation(state, action) {
      state.selectedLocation = action.payload
    },
    resetRequestVisitForm(state) {
      state.locations = defaultRequestVisitForm.locations
      state.patients = defaultRequestVisitForm.patients
      state.visitReasons = defaultRequestVisitForm.visitReasons
      state.selectedLocation = defaultRequestVisitForm.selectedLocation
    },
    resetVisitDetails(state) {
      state.visitDetails = defaultVisitDetails
    },
    resetPatients(state) {
      state.patients = defaultRequestVisitForm.patients
    },
  },
  extraReducers: {
    [asyncActions.fetchVisitDetails.fulfilled]: (state, action) => {
      state.visitDetails = action.payload || initialState.visitDetails
    },
    [asyncActions.addOrUpdateOrder.fulfilled]: (state, action) => {
      const type =
        state.selectedOrder.type === PROVIDER_ORDER_TYPES.MEDICATION
          ? 'orders'
          : state.selectedOrder.type
      if (state.selectedOrder.id) {
        const patchedTestIndex = state.visitDetails[type].findIndex(
          (order) => order.id === action.payload.id
        )
        state.visitDetails[type][patchedTestIndex] = {
          ...state.visitDetails[type][patchedTestIndex],
          ...action.payload,
        }
      } else if (action.payload) {
        state.visitDetails[type] = [...state.visitDetails[type], action.payload]
      }
    },
    [asyncActions.updateVisit.fulfilled]: (state, action) => {
      if (action.payload && state.visitDetails.id === action.payload.id)
        state.visitDetails = { ...state.visitDetails, ...action.payload }
    },
    [asyncActions.updateDischargeVisit.fulfilled]: (state, action) => {
      if (action.payload && state.visitDetails)
        state.visitDetails.discharge = {
          ...state.visitDetails.discharge,
          ...action.payload,
        }
    },
    [asyncActions.createDischargeVisit.fulfilled]: (state, action) => {
      if (action.payload && state.visitDetails)
        state.visitDetails.discharge = {
          ...state.visitDetails.discharge,
          ...action.payload,
        }
    },
    [asyncActions.fetchLocations.fulfilled]: (state, action) => {
      state.locations = action.payload || defaultRequestVisitForm.locations
    },
    [asyncActions.fetchLocationPatients.fulfilled]: (state, action) => {
      state.patients = action.payload || defaultRequestVisitForm.patients
    },
    [asyncActions.fetchVisitReasons.fulfilled]: (state, action) => {
      state.visitReasons =
        action.payload || defaultRequestVisitForm.visitReasons
    },
    [asyncActions.removeOrder.fulfilled]: (state, { payload }) => {
      // is this hacky?
      // I am just checking if the payload has a property that only exists on medication/orders but i can see how this could be error prone
      if (payload?.medication) {
        state.visitDetails.orders = state.visitDetails.orders.filter(
          ({ id: medicationId }) => payload.id !== medicationId
        )
      } else {
        state.visitDetails.tests = state.visitDetails.tests.filter(
          ({ id: testId }) => payload.id !== testId
        )
      }
    },
    [asyncActions.fetchVisitActivities.fulfilled]: (state, action) => {
      state.VisitActivities =
        action.payload || defaultRequestVisitForm.VisitActivities
    },
    [asyncActions.fetchVideoInvitations.fulfilled]: (state, action) => {
      const { data } = action.payload
      state.VideoInvitations = data || defaultRequestVisitForm.VideoInvitations
    },
    [asyncActions.fetchPatient.fulfilled]: (state, action) => {
      state.patientVisitDetails =
        { ...state.patientVisitDetails, ...action.payload } ||
        initialState.patientVisitDetails
    },
    [asyncActions.fetchPhqAssessmentDetails.fulfilled]: (state, action) => {
      state.lastCompletedPhq = action.payload || null
    },
  },
})

export default slice
export const { name, actions, reducer } = slice
