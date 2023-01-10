import React, { useState } from 'react'
import { StatusCard, TOGGLE_VARIANT } from 'components/molecules/StatusCard'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { OrderItem, ORDER_ITEM_VARIANT } from 'components/molecules/OrderItem'
import { getLocaleFormattedDateCompletion } from 'utils/getLocaleFormattedDate'
import { ORDER_ITEM_STATUS } from 'constants/orders'
import { FollowUpInstructionInput } from 'components/molecules/FollowUpInstructionInput'

export type MedicalAssessmentValuesType = {
  id?: number
  appearance?: string
  appearance_notes?: string | null
  eyes_ears_nose_throat?: string
  eyes_ears_nose_throat_notes?: string | null
  lymph_nodes?: string
  lymph_nodes_notes?: string | null
  heart_auscultation_supine_position?: string
  heart_auscultation_supine_position_notes?: string | null
  heart_auscultation_standing_position?: string
  heart_auscultation_standing_position_notes?: string | null
  heart_lower_pulses?: string
  heart_lower_pulses_notes?: string | null
  pulses?: string
  pulses_notes?: string | null
  lungs?: string
  lungs_notes?: string | null
  abdomen?: string
  abdomen_notes?: string | null
  skin?: string
  skin_notes?: string | null
  marfans_stigmata?: string
  marfans_stigmata_notes?: string | null
  is_pupils_equal?: boolean
  signature?: string | null
  updated_at?: string
}

export type MedicalAssessmentSummaryProps = {
  medicalAssessmentValues: MedicalAssessmentValuesType
  status: ORDER_ITEM_STATUS
  isFlagged: boolean
  handleSaveInstructions: (val: string) => void
  followUpInstructions: string
  handleCardOpen: () => void
  openEditModal: () => void
  isPreloading?: boolean
}

export const MedicalAssessmentSummary = ({
  medicalAssessmentValues = {},
  status,
  isFlagged,
  handleSaveInstructions,
  followUpInstructions,
  handleCardOpen,
  openEditModal,
  isPreloading = false,
}: MedicalAssessmentSummaryProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    id,
    appearance,
    appearance_notes,
    eyes_ears_nose_throat,
    eyes_ears_nose_throat_notes,
    lymph_nodes,
    lymph_nodes_notes,
    heart_auscultation_supine_position,
    heart_auscultation_supine_position_notes,
    heart_auscultation_standing_position,
    heart_auscultation_standing_position_notes,
    heart_lower_pulses,
    heart_lower_pulses_notes,
    pulses,
    pulses_notes,
    lungs,
    lungs_notes,
    abdomen,
    abdomen_notes,
    skin,
    skin_notes,
    marfans_stigmata,
    marfans_stigmata_notes,
    updated_at,
    is_pupils_equal,
  } = medicalAssessmentValues

  const handleToggle = async () => {
    if (!id && !isOpen) await handleCardOpen()
    setIsOpen(!isOpen)
  }

  return (
    <StatusCard
      title='Medical Assessment'
      status={status}
      eventKey='medicalAssessment'
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
          label='Appearance'
          value={appearance_notes || appearance}
          showIndicator={appearance === 'normal' ? false : true}
          dataTestId='appearance'
        />

        <OrderItem
          label='Eyes/Ears/Nose/Throat'
          value={eyes_ears_nose_throat_notes || eyes_ears_nose_throat}
          variant={ORDER_ITEM_VARIANT.LIGHT}
          showIndicator={eyes_ears_nose_throat === 'normal' ? false : true}
          dataTestId='eyes_ears_nose_throat'
        />

        <OrderItem
          label='Lymph Nodes'
          value={lymph_nodes_notes || lymph_nodes}
          showIndicator={lymph_nodes === 'normal' ? false : true}
          dataTestId='lymph_nodes'
        />

        <OrderItem
          label='Heart-Auscultation of the heart the supine position'
          value={
            heart_auscultation_supine_position_notes ||
            heart_auscultation_supine_position
          }
          variant={ORDER_ITEM_VARIANT.LIGHT}
          showIndicator={
            heart_auscultation_supine_position === 'normal' ? false : true
          }
          dataTestId='heart_auscultation_supine_position'
        />

        <OrderItem
          label='Heart-Auscultation of the heart the standing position'
          value={
            heart_auscultation_standing_position_notes ||
            heart_auscultation_standing_position
          }
          showIndicator={
            heart_auscultation_standing_position === 'normal' ? false : true
          }
          dataTestId='heart_auscultation_standing_position'
        />

        <OrderItem
          label='Heart-Lower extremity pulses'
          value={heart_lower_pulses_notes || heart_lower_pulses}
          variant={ORDER_ITEM_VARIANT.LIGHT}
          showIndicator={heart_lower_pulses === 'normal' ? false : true}
          dataTestId='heart_lower_pulses'
        />

        <OrderItem
          label='Pulses'
          value={pulses_notes || pulses}
          showIndicator={pulses === 'normal' ? false : true}
          dataTestId='pulses'
        />

        <OrderItem
          label='Lungs'
          value={lungs_notes || lungs}
          variant={ORDER_ITEM_VARIANT.LIGHT}
          showIndicator={lungs === 'normal' ? false : true}
          dataTestId='lungs'
        />

        <OrderItem
          label='Abdomen'
          value={abdomen_notes || abdomen}
          showIndicator={abdomen === 'normal' ? false : true}
          dataTestId='abdomen'
        />
        <OrderItem
          label='Skin'
          value={skin_notes || skin}
          variant={ORDER_ITEM_VARIANT.LIGHT}
          showIndicator={skin === 'normal' ? false : true}
          dataTestId='skin'
        />
        <OrderItem
          label='Marfan’s stigmata (arachnodactyly, pectus excavatum, joint hypermobility, scoliosis)'
          value={marfans_stigmata_notes || marfans_stigmata}
          variant={ORDER_ITEM_VARIANT.LIGHT}
          showIndicator={marfans_stigmata === 'normal' ? false : true}
          dataTestId='marfans_stigmata'
        />
        <OrderItem
          label='Pupils'
          value={is_pupils_equal ? 'normal' : 'abnormal'}
          variant={ORDER_ITEM_VARIANT.LIGHT}
          showIndicator={!is_pupils_equal}
          dataTestId='pupils'
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
