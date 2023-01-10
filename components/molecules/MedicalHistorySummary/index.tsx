import { useState } from 'react'
import { StatusCard, TOGGLE_VARIANT } from 'components/molecules/StatusCard'
import { BUTTON_VARIANT } from 'components/atoms/Button'
import type { JSONSchema7 } from 'json-schema'
import { FollowUpInstructionInput } from 'components/molecules/FollowUpInstructionInput'
import { ORDER_ITEM_STATUS } from 'constants/orders'
import { Section } from 'components/atoms/Section'
import { ButtonList } from '../ButtonList'
import {
  getLocaleFormattedDateSubmission,
  getLocaleFormattedDateCompletion,
} from 'utils/getLocaleFormattedDate'

export type MedicalHistorySummaryProps = {
  title: string
  shouldShowToggleLabel?: boolean
  status?: string
  data?: object[]
  url?: string
  schema?: JSONSchema7[]
  uiSchema?: object[]
  localization?: object[]
  orderType: string
  onToggle?: () => void
  isPreloading?: boolean
  isUploading?: boolean
  updated_at?: Date
  completed_at?: Date
  handleCardOpen: () => void
  handleOrderAction?: (type: string, action: string) => void
  openEditModal?: () => void
  openViewModal?: () => void
  followUpInstructions: string
  handleSaveInstructions: (val: string) => void
  isFlagged: boolean
}

export const MedicalHistorySummary = ({
  title,
  orderType,
  shouldShowToggleLabel = true,
  onToggle,
  isPreloading = false,
  isUploading = false,
  status,
  followUpInstructions,
  handleSaveInstructions,
  handleOrderAction,
  handleCardOpen,
  openViewModal,
  openEditModal,
  updated_at,
  completed_at,
  isFlagged,
  ...props
}: MedicalHistorySummaryProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const isIncompleteOrder = status === ORDER_ITEM_STATUS.INCOMPLETE
  const isCompleteOrder = status === ORDER_ITEM_STATUS.COMPLETE

  const orderStatus = isIncompleteOrder ? 'Submitted' : 'Completed'
  const orderTimeLine = isIncompleteOrder
    ? getLocaleFormattedDateSubmission(updated_at)
    : getLocaleFormattedDateCompletion(completed_at)

  const getButtonList = () => {
    switch (status) {
      case ORDER_ITEM_STATUS.COMPLETE:
        return [
          {
            variant: BUTTON_VARIANT.WARNING,
            style: 'mr-2',
            dataTest: 'edit-tobacco-screener',
            clickHandler: (ev: any) =>
              handleOrderAction('tobaccoScreener', ev.target.name),
            buttonText: 'Edit Order',
            name: 'editOrder',
          },
          {
            variant: BUTTON_VARIANT.PRIMARY,
            dataTest: 'view-tobacco-screener-results',
            clickHandler: openViewModal,
            buttonText: 'View Results',
            name: 'viewResults',
          },
        ]
      case ORDER_ITEM_STATUS.INCOMPLETE:
        return [
          {
            variant: BUTTON_VARIANT.DANGER,
            style: 'mr-2',
            dataTest: 'remove-tobacco-screener',
            clickHandler: (ev: any) =>
              handleOrderAction('tobaccoScreener', ev.target.name),
            buttonText: 'Remove Order',
            name: 'removeOrder',
          },
          {
            variant: BUTTON_VARIANT.WARNING,
            dataTest: 'complete-tobacco-screener',
            clickHandler: openEditModal,
            buttonText: 'Complete Order',
            name: 'completeOrder',
          },
        ]
      default:
        return null
    }
  }

  const handleToggle = async () => {
    if (!isOpen) await handleCardOpen()
    setIsOpen(!isOpen)
  }

  return (
    <StatusCard
      title={title}
      status={status}
      eventKey={orderType}
      unreadIndicator={false}
      printIndicatorWarning={isFlagged}
      isOpen={isOpen}
      onToggle={handleToggle}
      shouldShowToggleLabel={false}
      toggleVariant={TOGGLE_VARIANT.DARK}
      isLoading={isPreloading}
    >
      <>
        <Section
          title={`Assessment ${orderStatus}`}
          meta={`${orderStatus} at ${orderTimeLine}`}
        />

        {isIncompleteOrder && (
          <Section
            title='Please Provide Document Administration'
            horizontalRule
          />
        )}

        <ButtonList
          className='tw-mb-7 tw-flex tw-justify-end'
          list={getButtonList()}
        />

        {isCompleteOrder && (
          <FollowUpInstructionInput
            handleSaveInstructions={handleSaveInstructions}
            value={followUpInstructions}
          />
        )}
      </>
    </StatusCard>
  )
}
