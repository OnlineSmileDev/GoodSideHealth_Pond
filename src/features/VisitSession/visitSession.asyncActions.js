import { createAsyncThunk } from '@reduxjs/toolkit'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import doAsync from '../../infrastructure/doAsync'

export const fetchVisitSession = createAsyncThunk(
  'SessionVisit/fetch',
  async (id, thunkArgs, { useCaching, noBusySpinner } = {}) =>
    await doAsync({
      url: `/sessions/${id}`,
      useCaching,
      noBusySpinner,
      busyIndicatorName: BUSY_INDICATOR_NAME.FETCH_VISIT_SESSION,
      errorMessage:
        'Unable to load session visit details. Please try again later.',
      ...thunkArgs,
    })
)

export const updateVisitSession = createAsyncThunk(
  'VisitSession/update',
  async (
    { id, updatedSession },
    thunkArgs,
    { useCaching, noBusySpinner } = {}
  ) =>
    await doAsync({
      url: `sessions/${id}`,
      httpMethod: 'patch',
      httpConfig: { body: JSON.stringify(updatedSession) },
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to update session details. Please try again later.',
      ...thunkArgs,
    })
)
