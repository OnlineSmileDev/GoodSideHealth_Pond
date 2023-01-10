import React, { useState } from 'react'
import { Label } from 'components/atoms/Label'
import { Value } from 'components/atoms/Value'
import { OrderItem, ORDER_ITEM_VARIANT } from 'components/molecules/OrderItem'
import { FollowUpInstructionInput } from 'components/molecules/FollowUpInstructionInput'
import { StatusCard, TOGGLE_VARIANT } from 'components/molecules/StatusCard'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { getLocaleFormattedDateCompletion } from 'utils/getLocaleFormattedDate'
import { ORDER_ITEM_STATUS } from 'constants/orders'

export type VisionValuesType = {
  id?: number
  vision_left?: number
  vision_right?: number
  is_vision_corrected?: boolean
  updated_at?: string
}

export type VisionSummaryProps = {
  visionValues: VisionValuesType
  status: ORDER_ITEM_STATUS
  isFlagged: boolean
  handleSaveInstructions: (val: string) => void
  followUpInstructions: string
  handleCardOpen: () => void
  openEditModal: () => void
  isPreloading?: boolean
}

export const VisionSummary = ({
  visionValues = {},
  status,
  isFlagged,
  handleSaveInstructions,
  followUpInstructions,
  handleCardOpen,
  openEditModal,
  isPreloading = false,
}: VisionSummaryProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const { id, vision_left, vision_right, is_vision_corrected, updated_at } =
    visionValues

  const handleToggle = async () => {
    if (!id && !isOpen) await handleCardOpen()
    setIsOpen(!isOpen)
  }

  return (
    <StatusCard
      title='Vision'
      status={status}
      eventKey='vision'
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
          label='Vision'
          value={`R 20/${vision_right} L 20/${vision_left}`}
          showIndicator={vision_right > 40 || vision_left > 40}
          dataTestId='vision'
        />

        <OrderItem
          variant={ORDER_ITEM_VARIANT.LIGHT}
          dataTestId='is_vision_corrected'
        >
          <div className='tw-grid tw-grid-cols-2'>
            <div>
              <Label className='tw-py-0.5 tw-mb-0'>Vision Corrected</Label>
              <Value className='tw-py-0.5'>
                {is_vision_corrected ? 'Yes' : 'No'}
              </Value>
            </div>
          </div>
        </OrderItem>

        <div className='tw-flex tw-justify-end tw-mt-5'>
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
