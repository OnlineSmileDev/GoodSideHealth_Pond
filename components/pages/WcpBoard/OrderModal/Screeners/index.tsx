import { useCallback, useEffect, useState } from 'react'
import { PhqFormValuesType, ScreenerPhqForm } from './ScreenerPhq'
import {
  useGetOrderFormQuery,
  useInsertOrderFormMutation,
} from 'graphql/.generated'
import { SelectedOrderType } from '../types'
import { Complete } from './Complete'
import { ORDER_STATUS } from 'constants/orders'
import { getPhqFlagged } from './ScreenerPhq/utils'

export type ScreenerProps = {
  selectedOrder: SelectedOrderType
  handleModalAction?: () => void
  handleModalSkip?: () => void
  isUploading?: boolean
}

const PHQ_FORM_ID = 'phq'

const initialValues = {
  PH2: {
    interest: undefined,
    depression: undefined,
  },
}

export const Screeners = ({
  selectedOrder,
  handleModalAction,
  handleModalSkip,
  isUploading = false,
}: ScreenerProps) => {
  const { visitId, code, patientId, orderTypes } = selectedOrder
  const phqForm = orderTypes.find(
    ({ form_type_id }) => form_type_id === PHQ_FORM_ID
  )

  const [isPhqFormSubmitted, setIsPhqFormSubmitted] = useState(false)
  const [phqFormData, setPhqFormData] = useState(null)

  // TODO: For multiple screeners
  // Loop through ordertypes/forms
  // Create orderedList of renderable components
  // place components as children in the Screener Parent component Below

  // // Should have a loading state
  const { data, isFetched } = useGetOrderFormQuery({
    code,
    visit_id: visitId,
    patient_id: patientId,
    form_type: phqForm.form_type_id,
    language: 'en',
  })

  const { form_types = [], form_localizations = [] } = data || {}
  const order = data?.orders?.length ? data?.orders[0] : null
  const { id: orderId, status } = order || {}
  const { schema, ui_schema } = form_types[0] || {}

  const order_assessment = undefined
  const orderAssessment = order_assessment || initialValues

  // Should have a blocking state
  const {
    mutate: mutateOrder,
    // isLoading: isUpdateVisitStationMudationLoading,
  } = useInsertOrderFormMutation()

  const handleOrderUpdate = useCallback(
    (values: PhqFormValuesType) => {
      const shouldBeFlagged = getPhqFlagged(values)

      mutateOrder(
        {
          orderId,
          patient_id: patientId,
          type: PHQ_FORM_ID,
          data: [values],
          ...(status !== ORDER_STATUS.COMPLETE && {
            orderParams: {
              status: ORDER_STATUS.COMPLETE,
              completed_at: new Date().toISOString(),
              is_flagged: shouldBeFlagged,
            },
          }),
        },
        {
          onSuccess: () => {
            console.log(`${PHQ_FORM_ID} assessment updated!`)
            handleModalAction()
          },
        }
      )
    },
    [handleModalAction, mutateOrder, orderId, patientId, status]
  )

  useEffect(() => {
    if (isFetched && !order) handleModalSkip()
  }, [handleModalSkip, isFetched, order])

  const handlePhqFormAction = (phqFormData) => {
    setPhqFormData(phqFormData)
    setIsPhqFormSubmitted(true)
  }

  if (!order) return null

  if (isPhqFormSubmitted)
    return (
      <Complete
        reset={() => handleOrderUpdate(phqFormData)}
        isUploading={isUploading}
      />
    )

  return (
    <ScreenerPhqForm
      phqFormValues={orderAssessment}
      handleFormAction={handlePhqFormAction}
      schema={schema}
      uiSchema={ui_schema}
      localization={form_localizations[0]?.dictionary}
      isUploading={isUploading}
    />
  )
}
