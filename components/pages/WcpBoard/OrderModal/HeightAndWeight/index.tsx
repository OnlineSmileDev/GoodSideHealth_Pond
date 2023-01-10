import { useCallback } from 'react'
import {
  useGetOrderHeightAndWeightQuery,
  useCompleteOrderHeightAndWeightMutation,
} from 'graphql/.generated'
import { SelectedOrderType } from '../types'
import {
  HeightAndWeightForm,
  HeightAndWeightValuesType,
} from './HeightAndWeightForm'
import { ORDER_STATUS } from 'constants/orders'

const initialValues: HeightAndWeightValuesType = {
  height_ft: null,
  height_in: null,
  weight_lbs: null,
  pulse_bpm: null,
  pressure_systolic: null,
  pressure_diastolic: null,
}

export type HeightAndWeightProps = {
  selectedOrder: SelectedOrderType
  handleModalAction?: () => void
  isUploading?: boolean
}

export const HeightAndWeight = ({
  selectedOrder,
  handleModalAction,
  isUploading = false,
}: HeightAndWeightProps) => {
  const { code, visitId } = selectedOrder

  // Should have a loading state
  const { data, isLoading: isPreloading } = useGetOrderHeightAndWeightQuery({
    visit_id: +visitId,
    code, // visit Type
  })

  const order = data?.orders?.length ? data?.orders[0] : null
  const { id: orderId, order_height_and_weight, visit, status } = order || {}

  const {
    height_ft,
    height_in,
    weight_lbs,
    pulse_bpm,
    pressure_systolic,
    pressure_diastolic,
    bmi,
    bmi_percentile,
  } = order_height_and_weight || initialValues

  const orderHeightAndWeight = {
    height_ft,
    height_in,
    weight_lbs,
    pulse_bpm,
    pressure_systolic,
    pressure_diastolic,
    ...(bmi && bmi_percentile && { bmi, bmi_percentile }), // if this value is null, will prevent from submission
  }

  // Should have a blocking state
  const {
    mutate: mutateOrder,
    isLoading: isCompleteOrderHeightAndWeightMutationLoading,
  } = useCompleteOrderHeightAndWeightMutation()

  const handleOrderUpdate = useCallback(
    (
      heightAndWeightValues: HeightAndWeightValuesType,
      shouldBeFlagged: boolean
    ) => {
      mutateOrder(
        {
          orderId,
          ...heightAndWeightValues,
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
            console.log(`Order ${orderId} updated!`)
            handleModalAction()
          },
        }
      )
    },
    [handleModalAction, mutateOrder, orderId, status]
  )

  return (
    <HeightAndWeightForm
      visitValues={visit}
      heightAndWeightValues={orderHeightAndWeight}
      handleFormSubmission={handleOrderUpdate}
      isUploading={isCompleteOrderHeightAndWeightMutationLoading || isUploading}
      isPreloading={isPreloading}
    />
  )
}
