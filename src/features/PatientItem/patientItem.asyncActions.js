import { createAsyncThunk } from '@reduxjs/toolkit'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { createFilterString } from 'utils/createFilterString'
import doAsync from '../../infrastructure/doAsync'

export const fetchPatientDetails = createAsyncThunk(
  'patientItem/fetchPatientDetails',
  async ({ patientId, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: `/patients/${patientId}`,
      useCaching,
      noBusySpinner,
      busyIndicatorName: BUSY_INDICATOR_NAME.FETCH_PATIENT_ITEM,
      errorMessage: 'Unable to load patient details. Please try again later.',
      ...thunkArgs,
    })
)

export const fetchPatientVisits = createAsyncThunk(
  'patientItem/fetchPatientVisits',
  async (filters, thunkArgs, { useCaching, noBusySpinner } = {}) => {
    const filterQs = createFilterString(filters)
    const fullQs = filterQs ? `?${filterQs}` : ''
    return await doAsync({
      url: `visits${fullQs}`,
      useCaching,
      noBusySpinner,
      busyIndicatorName: BUSY_INDICATOR_NAME.FETCH_PATIENT_VISITS,
      errorMessage: 'Unable to load patient visits. Please try again later.',
      ...thunkArgs,
    })
  }
)

export const fetchLocations = createAsyncThunk(
  'patientItem/fetchLocations',
  async ({ organizationId, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: `locations?organizationId=${organizationId}`,
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to load locations. Please try again later.',
      ...thunkArgs,
    })
)

// const PATIENTS_API = process.env.NEXT_PUBLIC_PATIENTS_API
export const updatePatient = createAsyncThunk(
  'patientItem/updatePatient',
  async (
    { patientId, updatedPatient, useCaching, noBusySpinner } = {},
    thunkArgs
  ) =>
    // ToDo: Send directly to patients-api w/o proxy
    await doAsync({
      url: `/patients/${patientId}`,
      // url: `${PATIENTS_API}/patients/details/${patientId}`,
      httpMethod: 'patch',
      // ToDo: camelCaseToSnakeCase
      httpConfig: {
        body: JSON.stringify(updatedPatient),
      },
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to update patient. Please try again later.',
      ...thunkArgs,
    })
)

export const fetchOrganizations = createAsyncThunk(
  'patientItem/fetchOrganizations',
  async ({ useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: 'organizations',
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to load organizations. Please try again later.',
      ...thunkArgs,
    })
)
