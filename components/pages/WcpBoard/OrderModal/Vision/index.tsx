import { useCallback } from 'react'
import {
  useGetOrderVisionQuery,
  useCompleteOrderVisionMutation,
} from 'graphql/.generated'
import { SelectedOrderType } from '../types'
import { VisionForm, VisionValuesType } from './VisionForm'
import { ORDER_STATUS } from 'constants/orders'
import { useGetOrderVisionQuery } from '../../../../../graphql/.generated/index';

const initialValues = {
  vision_left: null,
  vision_right: null,
  is_vision_corrected: null,
}

export type VisionProps = {
  selectedOrder: SelectedOrderType
  handleModalAction?: () => void
  isUploading?: boolean
}

export const Vision = ({
  selectedOrder,
  handleModalAction,
  isUploading = false,
}: VisionProps) => {
  const { code, visitId } = selectedOrder

  // Should have a loading state
  const { data, isLoading: isPreloading } = useGetOrderVisionQuery({
    visit_id: +visitId,
    code, // visit Type
  })

  const order = data?.orders?.length ? data?.orders[0] : null
  const { id: orderId, order_vision, status } = order || {}

  const { vision_left, vision_right, is_vision_corrected } =
    order_vision || initialValues

  const orderVision = {
    vision_left,
    vision_right,
    is_vision_corrected,
  }
  
  // ToDo: Update to Vision Order Mutation
  // Should have a blocking state
  const {
    mutate: mutateOrder,
    isLoading: isCompleteOrderVisionMutationLoading,
  } = useCompleteOrderVisionMutation()

  const handleOrderUpdate = useCallback(
    (visionValues: VisionValuesType, shouldBeFlagged: boolean) => {
      mutateOrder(
        {
          orderId,
          ...visionValues,
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
    <VisionForm
      visionFormValues={orderVision}
      handleFormSubmission={handleOrderUpdate}
      isPreloading={isPreloading}
      isUploading={isCompleteOrderVisionMutationLoading || isUploading}
    />
  )
}
