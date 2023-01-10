import slice from './wizard.slice'
export const selectSlice = (state) => state[slice.name]
export const selectCurrentStep = (state) => selectSlice(state).currentStep

export const selectWizardFormValues = (state) => selectSlice(state).form

export const selectIsCurrentPageValid = (state) =>
  selectSlice(state).isCurrentPageValid

export const selectIsReplaceable = (state) => selectSlice(state).isReplaceable
