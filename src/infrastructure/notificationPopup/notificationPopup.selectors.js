import slice from './notificationPopup.slice'

export const selectSlice = (state) => state[slice.name]

export const selectNotification = (state) => selectSlice(state)

export const selectError = (state) => selectSlice(state).errorMessage

export const selectHasError = (state) => !!selectSlice(state).errorMessage
