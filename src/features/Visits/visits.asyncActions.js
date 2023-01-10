import { createAsyncThunk } from '@reduxjs/toolkit'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { createFilterString } from 'utils/createFilterString'
import doAsync from '../../infrastructure/doAsync'

export const fetchVisits = createAsyncThunk(
  'visits',
  async (filters, thunkArgs, { useCaching, noBusySpinner } = {}) => {
    const filterQs = createFilterString(filters)
    const fullQs = filterQs ? `?${filterQs}` : ''
    return await doAsync({
      url: `visits${fullQs}`,
      useCaching,
      noBusySpinner,
      busyIndicatorName: BUSY_INDICATOR_NAME.FETCH_VISITS,
      errorMessage: 'Unable to load visits. Please try again later.',
      ...thunkArgs,
    })
  }
)
