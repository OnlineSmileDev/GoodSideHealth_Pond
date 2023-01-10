import { createAsyncThunk } from '@reduxjs/toolkit'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import doAsync from '../../infrastructure/doAsync'

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async ({ id, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: `/users/${id}`,
      noBusySpinner,
      busyIndicatorName: BUSY_INDICATOR_NAME.FETCH_USER,
      errorMessage: 'Unable to load user details. Please try again later.',
      ...thunkArgs,
    })
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, updatedUser, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: `/users/${id}`,
      httpMethod: 'patch',
      busyIndicatorName: BUSY_INDICATOR_NAME.FETCH_USER,
      httpConfig: { body: JSON.stringify(updatedUser) },
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to update user. Please try again later.',
      ...thunkArgs,
    })
)

export const createUser = createAsyncThunk(
  'users/createUser',
  async ({ newUser, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: `/users`,
      httpMethod: 'post',
      busyIndicatorName: BUSY_INDICATOR_NAME.FETCH_USER,
      httpConfig: { body: JSON.stringify(newUser) },
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to update user. Please try again later.',
      ...thunkArgs,
    })
)

export const approveUser = createAsyncThunk(
  'users/approveUser',
  async ({ id, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: `/users/approve/${id}`,
      httpMethod: 'get',
      busyIndicatorName: BUSY_INDICATOR_NAME.FETCH_USER,
      useCaching,
      noBusySpinner,
      errorMessage: 'Unable to approve user. Please try again later.',
      ...thunkArgs,
    })
)

export const fetchUserEnrollmentDetails = createAsyncThunk(
  'users/fetchUserEnrollmentDetails',
  async ({ id, useCaching, noBusySpinner } = {}, thunkArgs) =>
    await doAsync({
      url: `/enrollments/${id}`,
      httpMethod: 'get',
      useCaching,
      noBusySpinner,
      errorMessage:
        'Unable to find enrollment details. Please try again later.',
      ...thunkArgs,
    })
)
