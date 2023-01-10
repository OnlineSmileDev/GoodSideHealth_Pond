import { createSlice } from '@reduxjs/toolkit'
import { getDateWithTZRanges } from 'utils/datePicker'
import * as asyncActions from './scheduleArchive.asyncActions'

const defaultScheduleArchiveData = []
const defaultScheduledVisits = {}

const initialState = {
  scheduleArchiveData: defaultScheduleArchiveData,
  selectedScheduleArchiveModal: null,
  schedulePatients: {},
  selectedPatient: {},
  selectedSession: {},
  scheduledVisits: {},
  filters: { date: getDateWithTZRanges(new Date()), sort: 'sessionTime' },
  schedulePatientDetailFilter: {},
  scheduleVisitSessionFilter: {},
}

const slice = createSlice({
  name: 'scheduleArchive',
  initialState,
  reducers: {
    setScheduleArchiveModal(state, action) {
      state.selectedScheduleArchiveModal =
        action.payload || initialState.selectedScheduleArchiveModal
    },
    saveSelectedPatient(state, action) {
      state.selectedPatient = action.payload
    },
    saveSelectedSession(state, action) {
      state.selectedSession = action.payload
    },
    setScheduleArchiveFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload }
    },
    setSchedulePatientDetailFilter(state, action) {
      state.schedulePatientDetailFilter = action.payload
    },
    setScheduleVisitSessionFilter(state, action) {
      state.scheduleVisitSessionFilter = action.payload
    },
    resetScheduleArchiveData(state) {
      state.scheduleArchiveData = defaultScheduleArchiveData
    },
    resetScheduledVisits(state) {
      state.scheduledVisits = defaultScheduledVisits
    },
  },
  extraReducers: {
    [asyncActions.fetchScheduleArchiveData.fulfilled]: (state, action) => {
      state.scheduleArchiveData = action.payload || defaultScheduleArchiveData
    },
    [asyncActions.fetchSchedulePatients.fulfilled]: (state, action) => {
      state.schedulePatients = action.payload || initialState.schedulePatients
    },
    [asyncActions.fetchVisitsOfSchedule.fulfilled]: (state, action) => {
      const { payload } = action
      let scheduleId = ''
      if (payload.length > 0) {
        scheduleId = payload[0].sessionId
      }
      state.scheduledVisits = payload
        ? {
            ...state.scheduledVisits,
            [scheduleId]: payload,
          }
        : state.scheduledVisits
    },
  },
})

export default slice

export const { name, actions, reducer } = slice
