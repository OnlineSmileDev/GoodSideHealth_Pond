import { useCallback } from 'react'
import {
  useGetOrderMusculoskeletalQuery,
  useCompleteOrderMusculoskeletalMutation,
} from 'graphql/.generated'
import { SelectedOrderType } from '../types'
import {
  MusculoskeletalForm,
  MusculoskeletalValuesType,
} from './MusculoskeletalForm'
import { DIAGNOSIS_RESULTS } from 'components/molecules/DiagnosticInput'
import { ORDER_STATUS } from 'constants/orders'

const checkValue = (field): string => field || DIAGNOSIS_RESULTS.NORMAL

export type MusculoskeletalProps = {
  selectedOrder: SelectedOrderType
  handleModalAction?: () => void
  isUploading?: boolean
}

export const Musculoskeletal = ({
  selectedOrder,
  handleModalAction,
  isUploading = false,
}: MusculoskeletalProps) => {
  const { code, visitId } = selectedOrder

  // Should have a loading state
  const { data, isLoading: isPreloading } = useGetOrderMusculoskeletalQuery({
    visit_id: +visitId,
    code, // visit Type
  })

  const order = data?.orders?.length ? data?.orders[0] : null
  const { id: orderId, order_musculoskeletal, status } = order || {}

  const {
    neck,
    neck_notes,
    back,
    back_notes,
    shoulder_or_arm,
    shoulder_or_arm_notes,
    elbow_or_forearm,
    elbow_or_forearm_notes,
    wrist_or_hand,
    wrist_or_hand_notes,
    hip_or_thigh,
    hip_or_thigh_notes,
    knee,
    knee_notes,
    leg_or_ankle,
    leg_or_ankle_notes,
    foot,
    foot_notes,
    signature,
  } = order_musculoskeletal || {}

  const orderMusculoskeletal = {
    neck: checkValue(neck),
    neck_notes,
    back: checkValue(back),
    back_notes,
    shoulder_or_arm: checkValue(shoulder_or_arm),
    shoulder_or_arm_notes,
    elbow_or_forearm: checkValue(elbow_or_forearm),
    elbow_or_forearm_notes,
    wrist_or_hand: checkValue(wrist_or_hand),
    wrist_or_hand_notes,
    hip_or_thigh: checkValue(hip_or_thigh),
    hip_or_thigh_notes,
    knee: checkValue(knee),
    knee_notes,
    leg_or_ankle: checkValue(leg_or_ankle),
    leg_or_ankle_notes,
    foot: checkValue(foot),
    foot_notes,
    signature,
  }

  // Should have a blocking state
  const {
    mutate: mutateOrder,
    isLoading: isCompleteOrderMusculoskeletalMutationLoading,
  } = useCompleteOrderMusculoskeletalMutation()

  const handleOrderUpdate = useCallback(
    (
      musculoskeletalValues: MusculoskeletalValuesType,
      shouldBeFlagged: boolean
    ) => {
      mutateOrder(
        {
          orderId,
          ...musculoskeletalValues,
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
    <MusculoskeletalForm
      musculoskeletalValues={orderMusculoskeletal}
      handleFormSubmission={handleOrderUpdate}
      isPreloading={isPreloading}
      isUploading={isCompleteOrderMusculoskeletalMutationLoading || isUploading}
    />
  )
}
