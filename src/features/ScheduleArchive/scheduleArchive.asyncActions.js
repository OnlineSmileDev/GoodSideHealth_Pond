import { createAsyncThunk } from '@reduxjs/toolkit'
import doAsync from '../../infrastructure/doAsync'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { createFilterString } from 'utils/createFilterString'

export const fetchScheduleArchiveData = createAsyncThunk(
  'scheduleArchive/fetch',
  async (filters, thunkArgs, { useCaching, noBusySpinner } = {}) => {
    const filterQs = createFilterString(filters)
    const fullQs = filterQs ? `?${filterQs}` : ''
    return await doAsync({
      url: `/sessions${fullQs}`,
      useCaching,
      noBusySpinner,
      busyIndicatorName: BUSY_INDICATOR_NAME.FETCH_SCHEDULE_ARCHIVE_DATA,
      errorMessage:
        'Unable to load schedule archive data. Please try again later.',
      ...thunkArgs,
    })
  }
)

// TODO- Refactor this endpoint
export const fetchSchedulePatients = createAsyncThunk(
  'schedulePatients/fetch',
  async (filters, thunkArgs, { useCaching, noBusySpinner } = {}) => {
    const filterQs = createFilterString(filters)
    const fullQs = filterQs ? `&${filterQs}` : ''
    return await doAsync({
      url: `/sessions?visits=true${fullQs}`,
      useCaching,
      noBusySpinner,
      errorMessage:
        'Unable to load schedule archive data. Please try again later.',
      ...thunkArgs,
    })
  }
)

export const saveTestSchedule = createAsyncThunk(
  'scheduleArchive/saveTestSchedule',
  async ({ session, useCaching, noBusySpinner } = {}, thunkArgs) => {
    await doAsync({
      url: `/appointments`,
      httpMethod: 'post',
      httpConfig: {
        body: JSON.stringify(session),
      },
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to save test schedule. Please try again later.',
      ...thunkArgs,
    })
  }
)

export const updateTestSchedule = createAsyncThunk(
  'scheduleArchive/upadateTestSchedule',
  async (
    { appointmentId, updatedSession, useCaching, noBusySpinner } = {},
    thunkArgs
  ) =>
    await doAsync({
      url: `/appointments/${appointmentId}`,
      httpMethod: 'patch',
      httpConfig: {
        body: JSON.stringify(updatedSession),
      },
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to update schedule. Please try again later.',
      ...thunkArgs,
    })
)

export const deleteTest = createAsyncThunk(
  'scheduleArchive/deleteTest',
  async ({ id, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: `/sessions/${id}`,
      httpMethod: 'delete',
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to delete test. Please try again later.',
      ...thunkArgs,
    })
)

export const fetchVisitsOfSchedule = createAsyncThunk(
  'scheduleVisits/fetch',
  async (sessionId, thunkArgs, { useCaching, noBusySpinner } = {}) => {
    return await doAsync({
      url: `/visits?sessionId=${sessionId}&getExtendedData=true`,
      useCaching,
      busyIndicatorName: BUSY_INDICATOR_NAME.FETCH_VISITS_OF_SCHEDULE,
      noBusySpinner,
      errorMessage: 'Unable to load scheduled visits. Please try again later.',
      ...thunkArgs,
    })
  }
)

export const deleteRecurringSession = createAsyncThunk(
  'scheduleArchive/deleteRecurringSession',
  async ({ id, allFuture, useCaching, noBusySpinner } = {}, thunkArgs) => {
    const queryString = allFuture ? `?allFuture=${allFuture}` : ''
    return await doAsync({
      url: `/appointments/${id}${queryString}`,
      httpMethod: 'delete',
      useCaching,
      noBusySpinner,
      errorMessage:
        'Unable to delete recurring session. Please try again later.',
      ...thunkArgs,
    })
  }
)
