import React, { useState } from 'react'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { Label } from 'components/atoms/Label'
import { StatusCard, TOGGLE_VARIANT } from 'components/molecules/StatusCard'
import { OrderItem, ORDER_ITEM_VARIANT } from 'components/molecules/OrderItem'
import { getLocaleFormattedDateCompletion } from 'utils/getLocaleFormattedDate'
import { Value } from 'components/atoms/Value'
import { ORDER_ITEM_STATUS } from 'constants/orders'
import { getHeightInInches } from 'utils/getHeightInInches'
import { getBMIClassification } from 'utils/bmi/getBMIClassification'
import { FollowUpInstructionInput } from 'components/molecules/FollowUpInstructionInput'

export type HeightAndWeightValuesType = {
  id?: number
  height_ft?: number
  height_in?: number
  weight_lbs?: number
  pulse_bpm?: number
  pressure_systolic?: number
  pressure_diastolic?: number
  updated_at?: string
  bmi?: number
  bmi_percentile?: number
}

export type HeightAndWeightSummaryProps = {
  heightAndWeightValues: HeightAndWeightValuesType
  status: ORDER_ITEM_STATUS
  isFlagged: boolean
  handleSaveInstructions: (val: string) => void
  followUpInstructions: string
  handleCardOpen: () => void
  openEditModal: () => void
  isPreloading?: boolean
}

export const HeightAndWeightSummary = ({
  heightAndWeightValues = {},
  status,
  isFlagged,
  handleSaveInstructions,
  followUpInstructions,
  handleCardOpen,
  openEditModal,
  isPreloading = false,
}: HeightAndWeightSummaryProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    id,
    height_ft,
    height_in,
    weight_lbs,
    pulse_bpm,
    pressure_systolic,
    pressure_diastolic,
    updated_at,
    bmi,
    bmi_percentile,
  } = heightAndWeightValues

  const bmiClassification = getBMIClassification(bmi_percentile)

  const handleToggle = async () => {
    if (!id && !isOpen) await handleCardOpen()
    setIsOpen(!isOpen)
  }

  return (
    <StatusCard
      title='Height & Weight'
      status={status}
      eventKey='heightAndWeight'
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

        <OrderItem dataTestId='height_and_weight'>
          <div className='tw-grid tw-grid-cols-2'>
            <div>
              <Label className='tw-py-0.5 tw-mb-0'>Height</Label>
              <Value className='tw-py-0.5'>
                <span>{height_ft}</span>&apos;<span>{`${height_in}`}</span>
                &#8221;
                <span>{` (${getHeightInInches(height_ft, height_in)}`}</span>
                &#8221;
                <span>)</span>
              </Value>
            </div>
            <div>
              <Label className='tw-py-0.5 tw-mb-0'>Weight</Label>
              <Value className='tw-py-0.5'>
                <span>{weight_lbs}</span> lbs
              </Value>
            </div>
          </div>
        </OrderItem>

        <OrderItem
          variant={ORDER_ITEM_VARIANT.LIGHT}
          dataTestId='bmi_and_pulse'
        >
          <div className='tw-grid tw-grid-cols-2'>
            <div>
              <Label className='tw-py-0.5 tw-mb-0'>{`BMI (Calculated)`}</Label>
              <Value className='tw-py-0.5'>
                {bmi_percentile >= 0
                  ? `${bmi}/${bmi_percentile}% - ${bmiClassification}`
                  : bmi}
              </Value>
            </div>
            <div>
              <Label className='tw-py-0.5 tw-mb-0'>Pulse</Label>
              <Value className='tw-py-0.5'>{pulse_bpm}</Value>
            </div>
          </div>
        </OrderItem>

        <OrderItem
          label='Blood Pressure'
          value={`${pressure_systolic}/${pressure_diastolic} (1/1,1/1)`}
          dataTestId='bloodPressure'
        />

        <div className='tw-flex tw-justify-end'>
          <Button
            name='editAssessment'
            size='none'
            className='tw-w-37.5'
            variant={BUTTON_VARIANT.LIGHT}
            onClick={openEditModal}
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
