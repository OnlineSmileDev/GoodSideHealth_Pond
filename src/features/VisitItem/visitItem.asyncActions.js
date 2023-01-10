import { createAsyncThunk } from '@reduxjs/toolkit'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { buildQsFromObject } from 'utils/buildQsFromObject'
import doAsync from '../../infrastructure/doAsync'

export const mockVisitReasons = [
  {
    reason: 'Fever',
  },
  {
    reason: 'Sore Throat',
  },
  {
    reason: 'Nausea/Vomiting',
  },
  {
    reason: 'Cold Symptoms',
  },
  {
    reason: 'Abdominal Pain',
  },
  {
    reason: 'Headache',
  },
  {
    reason: 'Menstrual Cramps',
  },
  {
    reason: 'Pink Eye',
  },
  {
    reason: 'Rash',
  },
  {
    reason: 'Minor Abrasions/Cuts/Wounds',
  },
  {
    reason: 'Covid Exposure',
  },
  {
    reason: 'GSH Remote Testing',
  },
  {
    reason: 'Training',
  },
]

export const fetchVisitDetails = createAsyncThunk(
  'visitItem/fetchVisitDetails',
  async ({ visitId, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: `/visits/${visitId}`,
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to load visit details. Please try again later.',
      ...thunkArgs,
    })
)

export const removeOrder = createAsyncThunk(
  'visitItem/removeOrder',
  async ({ id, type, useCaching, noBusySpinner } = {}, thunkArgs) => {
    const url = `/${type}/${id}`
    const res = await doAsync({
      url,
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to delete test. Please try again later.',
      httpMethod: 'delete',
      ...thunkArgs,
    })
    return res
  }
)

export const addOrUpdateOrder = createAsyncThunk(
  'visitItem/addOrUpdateOrder',
  async ({ updatedOrder, orderId, type } = {}, thunkArgs) => {
    let url = `/${type}`
    let httpMethod = 'post'
    let errorMessage = 'Unable to add Order to Database'
    if (orderId) {
      url = `${url}/${orderId}`
      httpMethod = 'patch'
      errorMessage = 'Unable to edit Order in Database'
    }
    const res = await doAsync({
      url,
      useCaching: false,
      noBusySpinner: false,
      errorMessage,
      httpMethod,
      httpConfig: {
        body: JSON.stringify(updatedOrder),
      },
      ...thunkArgs,
    })
    return res
  }
)

export const updateVisit = createAsyncThunk(
  'visitItem/updateVisit',
  async (
    { visitId, updatedVisit, useCaching, noBusySpinner, onError } = {},
    thunkArgs
  ) =>
    await doAsync({
      url: `/visits/${visitId}`,
      httpMethod: 'patch',
      httpConfig: {
        body: JSON.stringify(updatedVisit),
      },
      useCaching,
      noBusySpinner,
      onError,
      errorMessage: 'Unable to update visit. Please try again later.',
      ...thunkArgs,
    })
)

export const saveVisit = createAsyncThunk(
  'visitItem/saveVisit',
  async ({ visit, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: `/visits`,
      httpMethod: 'post',
      httpConfig: {
        body: JSON.stringify(visit),
      },
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to save visit. Please try again later.',
      ...thunkArgs,
    })
)

export const fetchLocations = createAsyncThunk(
  'visits/fetchLocations',
  async ({ value, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: `locations?name=${value}`,
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to load locations. Please try again later.',
      ...thunkArgs,
    })
)

export const fetchLocationPatients = createAsyncThunk(
  'visits/fetchLocationPatients',
  async (
    { locationId, organizationId, value, useCaching, noBusySpinner } = {},
    thunkArgs
  ) => {
    const EXTEND_PROGRAMS = 'programs'

    const query = Object.entries({
      extend: EXTEND_PROGRAMS,
      locationId: +locationId,
      organizationId: +organizationId,
      search: value,
    }).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {})

    return await doAsync({
      url: `/patients${buildQsFromObject(query)}`,
      useCaching,
      noBusySpinner,
      busyIndicatorName: BUSY_INDICATOR_NAME.FETCH_LOCATION_PATIENTS,
      errorMessage: 'Unable to load patients. Please try again later.',
      ...thunkArgs,
    })
  }
)

export const fetchVisitReasons = createAsyncThunk(
  'visits/fetchVisitReasons',
  async ({ useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: `api/visitReasons`,
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to load visit reasons. Please try again later.',
      stubSuccess: mockVisitReasons,
      ...thunkArgs,
    })
)

export const updateDischargeVisit = createAsyncThunk(
  'visitItem/updateDischargeVisit',
  async ({ id, dischargedVisit, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: `/discharges/${id}`,
      httpMethod: 'patch',
      httpConfig: {
        body: JSON.stringify(dischargedVisit),
      },
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to update visit. Please try again later.',
      ...thunkArgs,
    })
)

export const createDischargeVisit = createAsyncThunk(
  'visitItem/createDischargeVisit',
  async ({ dischargedVisit, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: `/discharges`,
      httpMethod: 'post',
      httpConfig: {
        body: JSON.stringify(dischargedVisit),
      },
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to update visit. Please try again later.',
      ...thunkArgs,
    })
)
export const createDischargePDF = createAsyncThunk(
  'visitItem/createDischargePDF',
  async (
    {
      visitId,
      timeZoneOffset,
      fileName,
      useCaching,
      noBusySpinner,
      onError,
    } = {},
    thunkArgs
  ) =>
    await doAsync({
      url: `/discharges/report/${visitId}?timeZoneOffset=${encodeURIComponent(
        timeZoneOffset
      )}`,
      httpMethod: 'get',
      useCaching,
      noBusySpinner,
      busyIndicatorName: BUSY_INDICATOR_NAME.CREATE_DISCHARGE_REPORT,
      errorMessage: 'Unable to create PDF. Please try again later.',
      onError,
      downloadFileName: fileName,
      ...thunkArgs,
    })
)
export const createClinicalPDF = createAsyncThunk(
  'visitItem/createClinicalPDF',
  async (
    { visitId, fileName, useCaching, noBusySpinner, onError } = {},
    thunkArgs
  ) =>
    await doAsync({
      url: `/visits/report/${visitId}`,
      httpMethod: 'get',
      useCaching,
      noBusySpinner,
      busyIndicatorName: BUSY_INDICATOR_NAME.CREATE_CLINICAL_REPORT,
      errorMessage: 'Unable to create PDF. Please try again later.',
      onError,
      downloadFileName: fileName,
      ...thunkArgs,
    })
)
export const fetchVisitActivities = createAsyncThunk(
  'visitActivities',
  async (visitId, thunkArgs, { useCaching, noBusySpinner } = {}) =>
    await doAsync({
      url: `/sessionLogs?visitId=${visitId}`,
      useCaching,
      noBusySpinner,
      errorMessage:
        'Unable to fetch visit activity Details. Please try again later',
      ...thunkArgs,
    })
)

export const updateProviderNotes = createAsyncThunk(
  'visitItem/updateProviderNotes',
  async ({ ProviderNotes, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: `/visitItem/updateProviderNotes`,
      httpMethod: 'patch',
      httpConfig: { body: JSON.stringify(ProviderNotes) },
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to update user. Please try again later.',
      ...thunkArgs,
    })
)

export const deleteVisit = createAsyncThunk(
  'visitItem/deleteVisit',
  async ({ id, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: `/visits/${id}`,
      httpMethod: 'delete',
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to delete visit. Please try again later.',
      ...thunkArgs,
    })
)

export const fetchPatient = createAsyncThunk(
  'visitItem/patient',
  async ({ id, useCaching, noBusySpinner, onError } = {}, thunkArgs) =>
    await doAsync({
      url: `/patients/${id}`,
      httpMethod: 'get',
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to fetch patient. Please try again later.',
      onError,
      ...thunkArgs,
    })
)

export const createVideoInvitation = createAsyncThunk(
  'visitItem/createVideoInvitation',
  async ({ videoInvitation, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: 'invitations/video',
      httpMethod: 'post',
      httpConfig: {
        body: JSON.stringify(videoInvitation),
      },
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to fetch patient. Please try again later.',
      ...thunkArgs,
    })
)
export const fetchVideoInvitations = createAsyncThunk(
  'visitItem/fetchVideoInvitations',
  async ({ videoCallId, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: `invitations/video?videoCallId=${videoCallId}`,
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to fetch invitations. Please try again later.',
      ...thunkArgs,
    })
)
export const deleteVideoInvitation = createAsyncThunk(
  'visitItem/deleteVideoInvitation',
  async ({ id, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: `invitations/video/${id}`,
      httpMethod: 'delete',
      useCaching,
      noBusySpinner,
      errorMessage:
        'Unable to delete Video Invitation. Please try again later.',
      ...thunkArgs,
    })
)
export const saveAssessmentResults = createAsyncThunk(
  'visitItem/saveAssessmentResults',
  async (
    { id, assessmentResults, useCaching, noBusySpinner } = {},
    thunkArgs
  ) =>
    await doAsync({
      url: `/assessments/${id}`,
      httpMethod: 'patch',
      httpConfig: {
        body: JSON.stringify(assessmentResults),
      },
      useCaching,
      noBusySpinner,
      errorMessage:
        'Unable to save assessment results. Please try again later.',
      ...thunkArgs,
    })
)

export const fetchPhqAssessmentDetails = createAsyncThunk(
  'visitItem/fetchPhqAssessmentDetails',
  async ({ patientId, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: `/assessments/patients/${patientId}`,
      useCaching,
      noBusySpinner,
      errorMessage:
        'Unable to load latest PHQ Assessment details. Please try again later.',
      ...thunkArgs,
    })
)
