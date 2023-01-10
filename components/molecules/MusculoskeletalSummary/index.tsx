import React, { useState } from 'react'
import { FollowUpInstructionInput } from 'components/molecules/FollowUpInstructionInput'
import { StatusCard, TOGGLE_VARIANT } from 'components/molecules/StatusCard'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { OrderItem, ORDER_ITEM_VARIANT } from 'components/molecules/OrderItem'
import { getLocaleFormattedDateCompletion } from 'utils/getLocaleFormattedDate'
import { ORDER_ITEM_STATUS } from 'constants/orders'

export type MusculoskeletalValuesType = {
  id?: number
  neck?: string
  neck_notes?: string | null
  back?: string
  back_notes?: string | null
  shoulder_or_arm?: string
  shoulder_or_arm_notes?: string | null
  elbow_or_forearm?: string
  elbow_or_forearm_notes?: string | null
  wrist_or_hand?: string
  wrist_or_hand_notes?: string | null
  hip_or_thigh?: string
  hip_or_thigh_notes?: string | null
  knee?: string
  knee_notes?: string | null
  leg_or_ankle?: string
  leg_or_ankle_notes?: string | null
  foot?: string
  foot_notes?: string | null
  signature?: string | null
  updated_at?: string
}

export type MusculoskeletalSummaryProps = {
  musculoskeletalValues: MusculoskeletalValuesType
  status: ORDER_ITEM_STATUS
  isFlagged: boolean
  handleSaveInstructions: (val: string) => void
  followUpInstructions: string
  handleCardOpen: () => void
  openEditModal: () => void
  isPreloading?: boolean
}

export const MusculoskeletalSummary = ({
  musculoskeletalValues = {},
  status,
  isFlagged,
  handleSaveInstructions,
  followUpInstructions,
  handleCardOpen,
  openEditModal,
  isPreloading = false,
}: MusculoskeletalSummaryProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    id,
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
    updated_at,
  } = musculoskeletalValues

  const handleToggle = async () => {
    if (!id && !isOpen) await handleCardOpen()
    setIsOpen(!isOpen)
  }

  return (
    <StatusCard
      title='Musculoskeletal'
      status={status}
      eventKey='musculoskeletal'
      unreadIndicator={false}
      isOpen={isOpen}
      onToggle={handleToggle}
      shouldShowToggleLabel={false}
      toggleVariant={TOGGLE_VARIANT.DARK}
      alertIndicator={isFlagged}
      isLoading={isPreloading}
    >
      <>
        <OrderItem
          label='Document Administration'
          value={`Completed at ${getLocaleFormattedDateCompletion(updated_at)}`}
          variant={ORDER_ITEM_VARIANT.LIGHT}
          dataTestId='document_administration'
        />

        <OrderItem
          label='Neck'
          value={neck_notes || neck}
          showIndicator={back === 'normal' ? false : true}
          dataTestId='neck'
        />

        <OrderItem
          label='Back'
          value={back_notes || back}
          variant={ORDER_ITEM_VARIANT.LIGHT}
          showIndicator={back === 'normal' ? false : true}
          dataTestId='back'
        />

        <OrderItem
          label='Shoulder/Arm'
          value={shoulder_or_arm_notes || shoulder_or_arm}
          showIndicator={shoulder_or_arm === 'normal' ? false : true}
          dataTestId='shoulder_or_arm'
        />

        <OrderItem
          label='Elbow/Forearm'
          value={elbow_or_forearm_notes || elbow_or_forearm}
          variant={ORDER_ITEM_VARIANT.LIGHT}
          showIndicator={elbow_or_forearm === 'normal' ? false : true}
          dataTestId='elbow_or_forearm'
        />

        <OrderItem
          label='Wrist/Hand'
          value={wrist_or_hand_notes || wrist_or_hand}
          showIndicator={wrist_or_hand === 'normal' ? false : true}
          dataTestId='wrist_or_hand'
        />

        <OrderItem
          label='Hip/Thigh'
          value={hip_or_thigh_notes || hip_or_thigh}
          variant={ORDER_ITEM_VARIANT.LIGHT}
          showIndicator={hip_or_thigh === 'normal' ? false : true}
          dataTestId='hip_or_thigh'
        />

        <OrderItem
          label='Knee'
          value={knee_notes || knee}
          showIndicator={knee === 'normal' ? false : true}
          dataTestId='knee'
        />

        <OrderItem
          label='Leg/Ankle'
          value={leg_or_ankle_notes || leg_or_ankle}
          variant={ORDER_ITEM_VARIANT.LIGHT}
          showIndicator={leg_or_ankle === 'normal' ? false : true}
          dataTestId='leg_or_ankle'
        />

        <OrderItem
          label='Foot'
          value={foot_notes || foot}
          showIndicator={foot === 'normal' ? false : true}
          dataTestId='foot'
        />

        <div className='tw-flex tw-justify-end'>
          <Button
            name='editAssessment'
            variant={BUTTON_VARIANT.LIGHT}
            onClick={openEditModal}
            size='none'
            className='tw-w-37.5'
          >
            Edit Assessment
          </Button>
        </div>

        <FollowUpInstructionInput
          handleSaveInstructions={handleSaveInstructions}
          value={followUpInstructions}
        />
      </>
    </StatusCard>
  )
}
