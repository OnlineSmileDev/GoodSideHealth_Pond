import { createAsyncThunk } from '@reduxjs/toolkit'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { createFilterString } from 'utils/createFilterString'
import doAsync from '../../infrastructure/doAsync'

export const fetchPatientArchive = createAsyncThunk(
  'patientArchive/fetch',
  async (filters, thunkArgs, { useCaching, noBusySpinner } = {}) => {
    const filterQs = createFilterString(filters)
    const fullQs = filterQs ? `?extend=programs&${filterQs}` : ''
    return await doAsync({
      url: `/patients${fullQs}`,
      useCaching,
      noBusySpinner,
      busyIndicatorName: BUSY_INDICATOR_NAME.FETCH_PATIENT_ARCHIVE,
      errorMessage:
        'Unable to load patient archive data. Please try again later.',
      ...thunkArgs,
    })
  }
)

export const fetchPatientCount = createAsyncThunk(
  'patientCount/fetch',
  async (filters, thunkArgs, { useCaching, noBusySpinner } = {}) => {
    const filterQs = createFilterString(filters)
    const fullQs = filterQs ? `?extend=programs&${filterQs}` : ''
    return await doAsync({
      url: `/patients/count${fullQs}`,
      useCaching,
      noBusySpinner,
      httpConfig: {
        headers: {
          'Cache-Control': 'max-age=3600',
        },
      },
      busyIndicatorName: BUSY_INDICATOR_NAME.FETCH_PATIENT_COUNT,
      errorMessage: 'Unable to get patient count. Please try again later.',
      ...thunkArgs,
    })
  }
)

export const sendRegistrationInvitation = createAsyncThunk(
  'patients/sendRegistrationInvitation',
  async ({ invitation, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: 'invitations/registration',
      httpMethod: 'post',
      httpConfig: {
        body: JSON.stringify(invitation),
      },
      useCaching,
      noBusySpinner,
      errorMessage:
        'Unable to send registration invite. Please try again later.',
      ...thunkArgs,
    })
)
