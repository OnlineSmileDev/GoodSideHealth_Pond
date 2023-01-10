import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFeatures } from 'flagged'
import { CustomSelectInput } from 'components/molecules/CustomSelectInput'
import { PROVIDER_ORDER_TYPES } from 'constants/orders'
import { actions } from '../../widgets/Wizard/wizard.slice'
import { selectWizardFormValues } from '../../widgets/Wizard/wizard.selectors'
import { selectSelectedOrder } from '../VisitItem/visitItem.selectors'
import medicationAndTestData from './orderModal.constants'

const { setIsCurrentPageValid, setFormValues } = actions
const RESPIRATORY = 'Respiratory'

const SelectOrder = () => {
  const dispatch = useDispatch()
  const wizardForm = useSelector(selectWizardFormValues)
  const { type, isStandingOrder } = useSelector(selectSelectedOrder)
  const { respiratoryMedicationOrder } = useFeatures()
  const orders = isStandingOrder
    ? medicationAndTestData.standingMedications.medicationCategories
    : Object.keys(medicationAndTestData[type])

  useEffect(() => {
    if (wizardForm.selectedTestOrCategory) dispatch(setIsCurrentPageValid(true))
    else dispatch(setIsCurrentPageValid(false))
  }, [dispatch, wizardForm, wizardForm.selectedTestOrCategory])
  useEffect(() => {
    dispatch(setFormValues({ dosage: '', medication: '' }))
  }, [wizardForm.selectedTestOrCategory, dispatch])
  const handleChange = (ev) => {
    const value = ev.value
    dispatch(setIsCurrentPageValid(!!value))
    dispatch(setFormValues({ selectedTestOrCategory: value }))
  }

  let options
  if (type === PROVIDER_ORDER_TYPES.TEST)
    options = orders.map((test) => ({
      label: test,
      value: test,
    }))
  if (type === PROVIDER_ORDER_TYPES.MEDICATION)
    options = orders
      .filter(
        (medication) => respiratoryMedicationOrder || medication !== RESPIRATORY
      )
      .map((medications) => ({
        label: medications,
        value: medications,
      }))

  let placeholder
  if (type === PROVIDER_ORDER_TYPES.TEST) placeholder = 'Select Test'
  if (type === PROVIDER_ORDER_TYPES.MEDICATION) placeholder = 'Category'

  return (
    <div className='p-20'>
      <p className='f-14 mb-30'>
        {type === PROVIDER_ORDER_TYPES.TEST &&
          'Please select the appropriate test for your order.'}
        {type === PROVIDER_ORDER_TYPES.MEDICATION &&
          `Please select the appropriate medication category for your order. On the next screen, we'll filter all available medications by the selected category.`}
      </p>
      <div className='mb-30'>
        <CustomSelectInput
          placeholder={placeholder}
          options={[...(options || [])]}
          onChange={handleChange}
          value={wizardForm.selectedTestOrCategory}
          showSearchBar={false}
          fieldsToBeDisplayed={['label']}
          keyField='label'
          className='mb-10'
        />
      </div>
    </div>
  )
}
export default SelectOrder
