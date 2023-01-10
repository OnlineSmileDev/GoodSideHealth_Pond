import slice from './users.slice'

export const selectSlice = (state) => state[slice.name]

export const selectUserDetails = (state) => selectSlice(state).user

export const selectUserEnrollmentDetails = (state) =>
  selectSlice(state).enrollmentDetails
