import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  currentStep: 0,
  form: {},
  isCurrentPageValid: false,
  isReplaceable: false,
}

const slice = createSlice({
  name: 'wizard',
  initialState,
  reducers: {
    resetCurrentStep(state, action) {
      state.currentStep = initialState.currentStep
    },
    nextClicked(state, action) {
      state.currentStep = state.currentStep + 1
    },
    backClicked(state, action) {
      state.currentStep = state.currentStep - 1
    },
    setIsCurrentPageValid(state, action) {
      state.isCurrentPageValid = action.payload
    },
    setFormValues(state, action) {
      state.form = { ...state.form, ...action.payload }
    },
    resetFormValues(state, action) {
      state.form = initialState.form
    },
    setIsReplaceable(state, action) {
      state.isReplaceable = action.payload
    },
    setCurrentStep(state, action) {
      state.currentStep = action.payload
    },
  },
})
export default slice
export const { name, actions, reducer } = slice
