import { createAsyncThunk } from '@reduxjs/toolkit'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { createFilterString } from 'utils/createFilterString'
import doAsync from '../../infrastructure/doAsync'

const campusStudentsMockData = [
  {
    dateOfBirth: '2020-03-01T15:24:05.802-06:00',
    firstName: 'Michel',
    id: '107842387',
    lastName: 'Ernser',
    studentId: '10406469',
  },
  {
    dateOfBirth: '2019-12-20T08:12:05.815-06:00',
    firstName: 'Jaren',
    id: '115919488',
    lastName: 'Hermiston',
    studentId: '10769977',
  },
  {
    dateOfBirth: '2020-07-12T17:50:37.762-05:00',
    firstName: 'Karen',
    id: '172282852',
    lastName: 'Adams',
    studentId: '10450103',
  },
]

const mockPatientData = [
  {
    patientName: 'Alicia Puma',
    dob: '04/05/88',
    id: '#10202020',
    tags: ['Soccer', 'Tennis', 'Band', '+2'],
  },
  {
    patientName: 'Cody Miles',
    dob: '04/05/88',
    id: '#10202021',
    tags: ['Soccer', 'Tennis'],
  },
  {
    patientName: 'Hugo Nash',
    dob: '04/05/88',
    id: '#10202022',
    tags: ['Soccer'],
  },
  {
    patientName: 'Daniel Noel',
    dob: '04/05/88',
    id: '#10202023',
    tags: ['Soccer', 'Tennis', 'Band'],
  },
]

export const fetchScreeningReports = createAsyncThunk(
  'screeningReport/fetch',
  async (filters, thunkArgs, { useCaching, noBusySpinner } = {}) => {
    const filterQs = createFilterString(filters)
    const fullQs = filterQs ? `?${filterQs}` : ''
    return await doAsync({
      url: `reports/screenings${fullQs}`,
      useCaching,
      noBusySpinner,
      busyIndicatorName: BUSY_INDICATOR_NAME.FETCH_SCREENING_REPORTS,
      errorMessage:
        'Unable to fetch Screening Reports. Please try again later.',
      ...thunkArgs,
    })
  }
)

// TODO: Need to use this while adding export csv feature in total submission table

export const fetchScreeningExport = createAsyncThunk(
  'screeningFile/fetch',
  async (filters, thunkArgs, { noBusySpinner } = {}) => {
    const filterQs = createFilterString(filters)
    const fullQs = filterQs ? `?${filterQs}` : ''
    return await doAsync({
      url: `reports/export${fullQs}`,
      noBusySpinner,
      downloadFileName: 'Total Submissions.csv',
      errorMessage:
        'Unable to download Screening Reports. Please try again later.',
      ...thunkArgs,
    })
  }
)

export const fetchScreeningAggregate = createAsyncThunk(
  'screeningAggregate/fetch',
  async (filters, thunkArgs, { noBusySpinner } = {}) => {
    const filterQs = createFilterString(filters)
    const fullQs = filterQs ? `?${filterQs}` : ''
    return await doAsync({
      url: `reports/aggregates${fullQs}`,
      noBusySpinner,
      busyIndicatorName: BUSY_INDICATOR_NAME.FETCH_SCREENING_AGGREGATE,
      errorMessage:
        'Unable to fetch Screening aggregate. Please try again later.',
      ...thunkArgs,
    })
  }
)

export const fetchLocations = createAsyncThunk(
  'screening/fetchLocations',
  async (filters, thunkArgs, { useCaching, noBusySpinner } = {}) => {
    const filterQs = createFilterString(filters || {})
    const fullQs = filterQs ? `?${filterQs}` : ''
    return await doAsync({
      url: `locations${fullQs}`,
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to load locations. Please try again later.',
      ...thunkArgs,
    })
  }
)

export const fetchDepartments = createAsyncThunk(
  'screening/fetchDepartments',
  async ({ value, useCaching, noBusySpinner } = {}, thunkArgs) => {
    const fullQS = value ? `?name=${value}` : ''
    return await doAsync({
      url: `departments${fullQS}`,
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to load departments. Please try again later.',
      ...thunkArgs,
    })
  }
)

export const fetchLocationStudents = createAsyncThunk(
  'screnning/fetchLocationStudents',
  async ({ locationId, value, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: `/search/students?locationId=${locationId}&search=${value}`,
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to load students. Please try again later.',
      stubSuccess: campusStudentsMockData, // TODO - This may updated and need to map with BE data
      ...thunkArgs,
    })
)
export const certifyStudentSubmission = createAsyncThunk(
  'screeningDataDashboard/certifyStudent',
  async ({ certifiedSubmission, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: `reports/screenings`,
      httpMethod: 'post',
      httpConfig: {
        body: JSON.stringify(certifiedSubmission),
      },
      useCaching,
      noBusySpinner,
      errorMessage:
        'Unable to save student submission. Please try again later.',
      ...thunkArgs,
    })
)

export const fetchPatientsForScheduleTest = createAsyncThunk(
  'screnning/fetchLocationStudents',
  async ({ locationId, value, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: `/search/shedule/test`,
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to load students. Please try again later.',
      stubSuccess: mockPatientData, // TODO - This may updated and need to map with BE data
      ...thunkArgs,
    })
)

export const fetchOrganizations = createAsyncThunk(
  'screening/fetchOrganizations',
  async ({ useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: 'organizations',
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to load organizations. Please try again later.',
      ...thunkArgs,
    })
)
