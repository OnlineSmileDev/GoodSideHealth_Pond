import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { LABEL_POSITIONS } from 'constants/general'
import { PROVIDER_ORDER_TYPES } from 'constants/orders'
import { showModal } from '../../widgets/modal'
import Wizard from '../../widgets/Wizard'
import OrderSelect from './OrderSelect'
import OrderInstructions from './OrderInstructions'
import OrderMedicationAndDosage from './OrderMedicationAndDosage'
import { addOrUpdateOrder } from '../VisitItem/visitItem.asyncActions'
import {
  selectSelectedOrder,
  selectVisitDetails,
} from '../VisitItem/visitItem.selectors'
import { actions } from '../VisitItem/visitItem.slice'

const { setSelectedOrder, setSelectedMiddlePanelModal } = actions

const OrderModal = () => {
  const router = useRouter()
  const { id: visitId } = router.query
  const dispatch = useDispatch()
  const {
    id: orderId,
    type,
    isStandingOrder,
  } = useSelector(selectSelectedOrder)
  const { tests, orders } = useSelector(selectVisitDetails)
  const isOrderTypeTest = type === PROVIDER_ORDER_TYPES.TEST

  let orderToEdit
  if (orderId && isOrderTypeTest) {
    orderToEdit = tests.find(({ id }) => id === orderId)
  } else if (orderId) {
    orderToEdit = orders.find(({ id }) => id === orderId)
  }
  const onClose = () => dispatch(setSelectedMiddlePanelModal(null))

  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])

  const medicationSteps = [
    { label: 'Medication Category', component: OrderSelect },
    { label: 'Medication Order', component: OrderMedicationAndDosage },
    { label: 'Instructions', component: OrderInstructions },
  ]

  const testSteps = [
    { label: 'Select Test', component: OrderSelect },
    { label: 'Instructions', component: OrderInstructions },
  ]
  let title, orderSteps
  if (isOrderTypeTest) {
    title = 'Test Order'
    orderSteps = testSteps
  } else {
    title = isStandingOrder ? 'Standing Medication Order' : 'Medication Order'
    orderSteps = medicationSteps
  }
  if (orderToEdit) {
    orderSteps = [{ label: 'Instructions', component: OrderInstructions }]
  }
  const onFinalize = (
    { notes = '', dosage = '', medication = '', selectedTestOrCategory = '' },
    resetWizard
  ) => {
    // This should be refactored but just adding it here for now to get this merged in for testing.
    const order = {
      visitId: Number(visitId),
      providerOrders: notes,
    }
    if (isStandingOrder) order.isStanding = true
    if (!orderToEdit) order.status = 'Incomplete'

    let updatedOrder = order
    if (!orderToEdit && isOrderTypeTest)
      updatedOrder = { ...order, type: selectedTestOrCategory }
    if (!orderToEdit && !isOrderTypeTest)
      updatedOrder = {
        ...order,
        dosage,
        medication,
        category: selectedTestOrCategory,
      }
    dispatch(
      setSelectedOrder({
        id: orderToEdit?.id,
        type,
      })
    )
    if (orderToEdit) {
      dispatch(addOrUpdateOrder({ updatedOrder, orderId, type }))
    } else {
      dispatch(addOrUpdateOrder({ updatedOrder, type }))
    }
    onClose()
    resetWizard()
  }

  let utilityClass
  if (isOrderTypeTest && orderToEdit)
    utilityClass = 'pendo-edit-test-order-submit-button'
  if (isOrderTypeTest && !orderToEdit)
    utilityClass = 'pendo-test-order-submit-button'
  if (!isOrderTypeTest && orderToEdit)
    utilityClass = 'pendo-edit-medication-order-submit-button'
  if (!isOrderTypeTest && !orderToEdit)
    utilityClass = 'pendo-medication-order-submit-button'

  const getInitialFormValues = () => {
    if (orderToEdit?.providerOrders) {
      return {
        notes: orderToEdit.providerOrders,
        medication: orderToEdit.medication,
        selectedTestOrCategory: orderToEdit.category,
      }
    } else return {}
  }

  return (
    <Wizard
      pages={orderSteps}
      onFinalize={onFinalize}
      onCancel={onClose}
      title={title}
      finalButtonText='Submit'
      initialFormData={getInitialFormValues()}
      labelPosition={LABEL_POSITIONS.BOTTOM}
      utilityClass={utilityClass}
    />
  )
}

export default OrderModal
