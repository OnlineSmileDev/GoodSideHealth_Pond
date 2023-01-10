import React, { useState } from 'react'
import { StatusCard } from 'components/molecules/StatusCard'
import { Section } from 'components/atoms/Section'
import { ButtonList } from 'components/molecules/ButtonList'
import { FollowUpInstructionInput } from 'components/molecules/FollowUpInstructionInput'
import { TOGGLE_VARIANT } from 'components/molecules/StatusCard'
import { BUTTON_VARIANT } from 'components/atoms/Button'
import { ORDER_ITEM_STATUS } from 'constants/orders'
import {
  getLocaleFormattedDateSubmission,
  getLocaleFormattedDateCompletion,
} from 'utils/getLocaleFormattedDate'

export type TobaccoScreenerSummaryProps = {
  completed_at?: string
  updated_at?: string
  status: ORDER_ITEM_STATUS
  isFlagged: boolean
  handleOrderAction: (type: string, action: string) => void
  handleSaveInstructions: (val: string) => void
  followUpInstructions: string
  handleCardOpen: () => void
  openEditModal: () => void
  openViewModal: () => void
  isPreloading?: boolean
}

export const TobaccoScreenerSummary = ({
  completed_at,
  updated_at,
  status,
  isFlagged,
  handleOrderAction,
  handleSaveInstructions,
  followUpInstructions,
  handleCardOpen,
  openEditModal,
  openViewModal,
  isPreloading = false,
}: TobaccoScreenerSummaryProps) => {
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
            clickHandler: openEditModal,
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
      title='Tobacco Screener'
      status={status}
      eventKey='tobaccoScreener'
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
