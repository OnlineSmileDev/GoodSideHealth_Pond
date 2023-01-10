import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputWidget } from 'components/molecules/InputWidget'
import { PROVIDER_ORDER_TYPES } from 'constants/orders'
import { actions } from '../../widgets/Wizard/wizard.slice'
import { selectWizardFormValues } from '../../widgets/Wizard/wizard.selectors'
import {
  selectSelectedOrder,
  selectVisitDetails,
} from '../VisitItem/visitItem.selectors'
import medicationAndTestData from './orderModal.constants'

const { setIsCurrentPageValid, setFormValues } = actions

const OrderInstructions = () => {
  const dispatch = useDispatch()
  const wizardForm = useSelector(selectWizardFormValues)
  const { notes, medication, selectedTestOrCategory } = wizardForm
  const {
    id: orderId,
    type,
    isStandingOrder,
  } = useSelector(selectSelectedOrder)
  const { tests, orders } = useSelector(selectVisitDetails)

  const isOrderTypeTest = type === PROVIDER_ORDER_TYPES.TEST
  const isOrderTypeMedication = type === PROVIDER_ORDER_TYPES.MEDICATION
  let templateInstructions

  if (isOrderTypeTest)
    templateInstructions =
      medicationAndTestData.tests[selectedTestOrCategory]?.instructions
  else if (isOrderTypeMedication && isStandingOrder)
    templateInstructions =
      medicationAndTestData.standingMedications?.insructions
  else if (isOrderTypeMedication)
    templateInstructions =
      medicationAndTestData.medications[selectedTestOrCategory]?.[medication]
        ?.instructions
  const allergenAlertToDisplay =
    medicationAndTestData?.medications?.[selectedTestOrCategory]?.[medication]
      ?.allergenAlert

  let orderToEdit
  if (orderId && isOrderTypeTest) {
    orderToEdit = tests.find(({ id }) => id === orderId)
  } else if (orderId) {
    orderToEdit = orders.find(({ id }) => id === orderId)
  }

  useEffect(() => {
    dispatch(setIsCurrentPageValid(true))
  }, [dispatch])

  useEffect(() => {
    if (templateInstructions)
      dispatch(setFormValues({ notes: templateInstructions }))
  }, [dispatch, templateInstructions])

  const handleChange = (field, value) => {
    dispatch(setFormValues({ [field]: value }))
  }

  return (
    <div className='p-20'>
      <p className='f-14 mb-30'>
        {type === PROVIDER_ORDER_TYPES.TEST &&
          'Based on the selected test, we have determined the below test order instructions. Before submitting this test order to the facilitator, please ensure the information below is correct.'}
        {type === PROVIDER_ORDER_TYPES.MEDICATION &&
          'Based on the selected medication and current patient information, we have determined the below medication order instructions. Before submitting this order to the facilitator, please ensure the information below is correct.'}
      </p>
      <div className='mb-30'>
        <InputWidget
          as='textarea'
          cols='30'
          rows='6'
          className='tw-mb-2'
          placeholder='Additional Notes'
          onChange={(ev) => handleChange('notes', ev.target.value)}
          value={notes}
          defaultValue={
            orderToEdit?.providerOrders || templateInstructions || ''
          }
        />
        {allergenAlertToDisplay ? (
          <p className='tw-text-danger tw-text-sm'>{allergenAlertToDisplay}</p>
        ) : null}
      </div>
    </div>
  )
}
export default OrderInstructions
