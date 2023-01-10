import Wizard from './Wizard'
import * as selectors from './wizard.selectors'
import slice from './wizard.slice'
export const { name, actions, reducer } = slice
export const {
  selectCurrentStep,
  selectWizardFormValues,
  selectIsCurrentPageValid,
  selectIsReplaceable,
} = selectors
export default Wizard
