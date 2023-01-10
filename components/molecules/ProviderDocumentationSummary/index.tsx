import React, { useState } from 'react'
import { StatusCard, TOGGLE_VARIANT } from 'components/molecules/StatusCard'
import { BUTTON_VARIANT } from 'components/atoms/Button'
import { Section } from 'components/atoms/Section'
import { ButtonList } from 'components/molecules/ButtonList'
import { ORDER_ITEM_STATUS } from 'constants/orders'
import {
  getLocaleFormattedDateSubmission,
  getLocaleFormattedDateCompletion,
} from 'utils/getLocaleFormattedDate'

export type ProviderDocumentationSummaryProps = {
  completed_at?: string
  updated_at?: string
  status: ORDER_ITEM_STATUS
  handleOrderAction: (type: string, action: string) => void
  handleCardOpen: () => void
  openEditModal: () => void
  openViewModal: () => void
  isPreloading?: boolean
}

export const ProviderDocumentationSummary = ({
  completed_at,
  updated_at,
  status,
  handleOrderAction,
  handleCardOpen,
  openEditModal,
  openViewModal,
  isPreloading = false,
}: ProviderDocumentationSummaryProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const isIncompleteOrder = status === ORDER_ITEM_STATUS.INCOMPLETE
  const isCompleteOrder = status === ORDER_ITEM_STATUS.COMPLETE

  const orderStatus = isIncompleteOrder ? 'Submitted' : 'Completed'
  const orderTimeLine = isIncompleteOrder
    ? getLocaleFormattedDateSubmission(updated_at)
    : getLocaleFormattedDateCompletion(completed_at)

  const getButtonList = () => {
    switch (true) {
      case status === ORDER_ITEM_STATUS.COMPLETE:
        return [
          {
            variant: BUTTON_VARIANT.WARNING,
            style: 'mr-2',
            dataTest: 'edit-provider-documentation',
            clickHandler: openEditModal,
            buttonText: 'Edit Order',
            name: 'editOrder',
          },
          {
            variant: BUTTON_VARIANT.PRIMARY,
            dataTest: 'view-provider-documentation-results',
            clickHandler: openViewModal,
            buttonText: 'View Results',
            name: 'viewResults',
          },
        ]
      case status === ORDER_ITEM_STATUS.INCOMPLETE:
        return [
          {
            variant: BUTTON_VARIANT.DANGER,
            style: 'mr-2',
            dataTest: 'remove-provider-documentation',
            clickHandler: (ev: any) =>
              handleOrderAction('providerDocumentation', ev.target.name),
            buttonText: 'Remove Order',
            name: 'removeOrder',
          },
          {
            variant: BUTTON_VARIANT.WARNING,
            dataTest: 'complete-provider-documentation',
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
      title='Provider Documentation'
      status={status}
      eventKey='providerDocumentation'
      unreadIndicator={false}
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
      </>
    </StatusCard>
  )
}
