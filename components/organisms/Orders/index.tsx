import React, { useState, useEffect } from 'react'
import { Section } from 'components/atoms/Section'
import { ButtonList } from 'components/molecules/ButtonList'
import { StatusCard } from 'components/molecules/StatusCard'
import { BUTTON_VARIANT } from 'components/atoms/Button'
import { ORDER_TYPES, ORDER_STATUS } from 'constants/orders'
import {
  getLocaleFormattedDateSubmission,
  getLocaleFormattedDateCompletion,
} from 'utils/getLocaleFormattedDate'
import { FollowUpInstructionsInput } from './FollowUpInstructionsInput'

export type OrdersProps = {
  orderType: string
  isProvider: boolean
  isVisitActive: boolean
  orders: Array<any>
  openOrderEditModal?: () => void
  removeOrderFromList?: () => void
  openDocumentAdministrationModal?: () => void
  setReadStatusToRead?: () => void
  saveFollowUpInstructions?: () => void
  openPHQModal?: () => void
}

export const Orders = ({
  orderType,
  isProvider,
  isVisitActive,
  orders = [],
  openOrderEditModal,
  removeOrderFromList,
  openDocumentAdministrationModal,
  setReadStatusToRead,
  saveFollowUpInstructions,
  openPHQModal,
}) => {
  const [toggle, setToggle] = useState({})
  const isOrderTypeAssessment = orderType === ORDER_TYPES.ASSESSMENT
  const isOrderTypeMedication = orderType === ORDER_TYPES.MEDICATION
  const { WARNING, DANGER, PRIMARY } = BUTTON_VARIANT

  const ordersWithEventKey = orders
    .slice()
    .sort((firstOrder, secondOrder) => firstOrder.id - secondOrder.id)
    .map((each, index) => ({ ...each, eventKey: index + 1 }))
    .reverse()

  useEffect(() => {
    setToggle({})
  }, [ordersWithEventKey.length])

  const isIncompleteOrder = (status) =>
    status === ORDER_STATUS.INCOMPLETE || status === ORDER_STATUS.PENDING

  return ordersWithEventKey?.map(
    (
      {
        status,
        eventKey,
        providerOrders,
        completedAt,
        type,
        createdAt,
        unread,
        administrationNotes = 'N/A',
        followUpInstructions,
        medication,
        dosage,
        id,
      },
      i
    ) => {
      const isDeclinedOrder = status === ORDER_STATUS.DECLINED
      // PERMISSION:- Can Create Order/Can Delete Order
      const isOrderActiveForProvider = isIncompleteOrder(status) && isProvider
      // PERMISSION:-  Can Complete/Declined order
      const isOrderActiveForFacilitator =
        isIncompleteOrder(status) && !isProvider
      // PERMISSION:- Can Complete/Declined order
      const isOrderCompletedForFacilitator =
        !isIncompleteOrder(status) && !isProvider
      // PERMISSION:- Can Create Order
      const isOrderCompletedForProvider =
        !isIncompleteOrder(status) && isProvider && !isDeclinedOrder
      const orderStatus = isIncompleteOrder(status)
        ? 'Submitted'
        : isDeclinedOrder
        ? 'Declined'
        : 'Completed'
      const medicationTitle = dosage ? `${medication}, ${dosage} ` : medication

      const handleToggle = () => {
        // PERMISSION:- Can Complete/Declined order
        if (!isProvider && isVisitActive && unread) {
          setReadStatusToRead({ orderId: id, orderType })
        }
        setToggle((prevToggle) => ({ ...prevToggle, [id]: !toggle[id] }))
      }

      const getButtonList = () => {
        if (isVisitActive) {
          switch (true) {
            case isOrderActiveForProvider:
              return [
                {
                  variant: WARNING,
                  style: 'mr-2',
                  dataTest: `button-edit-order-${orderType}-${i}`,
                  clickHandler: (ev: any) =>
                    isOrderTypeAssessment
                      ? openPHQModal({ id, name: ev.target.name })
                      : openOrderEditModal({ id, type: orderType }),
                  buttonText: `Edit ${
                    isOrderTypeAssessment ? 'Assessment' : 'Order'
                  }`,
                  name: 'editOrder',
                },
                {
                  variant: DANGER,
                  dataTest: `button-remove-order-${orderType}-${i}`,
                  clickHandler: () =>
                    removeOrderFromList({ id, type: orderType }),
                  buttonText: `Remove ${
                    isOrderTypeAssessment ? 'Assessment' : 'Order'
                  }`,
                },
              ]
            case isOrderActiveForFacilitator:
              return [
                {
                  variant: WARNING,
                  style: 'mr-2',
                  dataTest: `button-complete-order-${orderType}-${i}`,
                  clickHandler: (ev: any) =>
                    isOrderTypeAssessment
                      ? openPHQModal({ id, name: ev.target.name })
                      : openDocumentAdministrationModal({
                          id,
                          type: orderType,
                        }),
                  buttonText: 'Complete Order',
                  name: 'completeOrder',
                },
                {
                  variant: DANGER,
                  dataTest: `button-decline-order-${orderType}-${i}`,
                  clickHandler: () =>
                    openDocumentAdministrationModal({
                      id,
                      type: orderType,
                      status: ORDER_STATUS.DECLINED,
                    }),
                  buttonText: 'Decline Order',
                },
              ]
            case isOrderCompletedForFacilitator:
              return [
                {
                  variant: PRIMARY,
                  className: `pendo-edit-${orderType}-button`,
                  dataTest: `button-edit-note-${orderType}-${i}`,
                  clickHandler: () =>
                    openDocumentAdministrationModal({
                      id,
                      type: orderType,
                    }),
                  buttonText: 'Edit Note',
                },
              ]
            case isOrderCompletedForProvider && isOrderTypeAssessment:
              return [
                {
                  variant: PRIMARY,
                  style: 'mr-15',
                  dataTest: `button-view-results-assessment-${i}`,
                  clickHandler: (ev: any) =>
                    openPHQModal({ id, name: ev.target.name }),
                  buttonText: 'View Results',
                  name: 'viewResults',
                },
                {
                  variant: WARNING,
                  dataTest: `button-edit-assessment-${i}`,
                  clickHandler: (ev: any) =>
                    openPHQModal({ id, name: ev.target.name }),
                  buttonText: 'Edit Assessment',
                  name: 'editOrder',
                },
              ]
            default:
              return null
          }
        } else {
          switch (true) {
            case isOrderCompletedForProvider && isOrderTypeAssessment:
              return [
                {
                  variant: PRIMARY,
                  style: 'mr-15',
                  dataTest: `button-view-results-assessment-${i}`,
                  clickHandler: (ev: any) =>
                    openPHQModal({ id, name: ev.target.name }),
                  buttonText: 'View Results',
                  name: 'viewResults',
                },
              ]
            default:
              return null
          }
        }
      }

      return (
        <StatusCard
          key={`${orderType}-${id}`}
          // PERMISSION:- Can Complete/Declined order
          unreadIndicator={!isProvider && unread && isVisitActive}
          title={isOrderTypeMedication ? medicationTitle : type}
          status={status}
          eventKey={eventKey}
          onToggle={handleToggle}
          isOpen={toggle[id]}
          data-test={`button-more-details-${orderType}-${i}`}
          id={id}
        >
          <div className='pt-0'>
            {/* Order */}

            {isOrderTypeAssessment ? (
              <Section
                title={`Assessment ${orderStatus}`}
                meta={`Submitted at ${getLocaleFormattedDateSubmission(
                  createdAt
                )}`}
              />
            ) : (
              <Section
                title='Provider Orders'
                meta={`Submitted at ${getLocaleFormattedDateSubmission(
                  createdAt
                )}`}
              >
                {providerOrders}
              </Section>
            )}

            {/* Document Administration */}

            {!isIncompleteOrder(status) ? (
              administrationNotes ? (
                <Section
                  title='Document Administration'
                  meta={`Completed at
                                 ${getLocaleFormattedDateCompletion(
                                   completedAt
                                 )}`}
                  horizontalRule
                >
                  {administrationNotes}
                </Section>
              ) : null
            ) : (
              // PERMISSION:- Can Complete/Declined order
              !isProvider &&
              isVisitActive && (
                <Section
                  title='Please Provide Document Administration'
                  horizontalRule
                />
              )
            )}

            {/* Action Buttons */}
            <ButtonList className='mb-20' list={getButtonList()} />

            {/* Provider Follow-up instructions */}

            {isOrderCompletedForProvider && isVisitActive && (
              <>
                <Section title='Follow-up Instructions' horizontalRule>
                  {followUpInstructions}
                </Section>
                <p className='f-14 mb-20'>
                  The following instructions will be appended to your provider
                  note.
                </p>
                <FollowUpInstructionsInput
                  followUpInstructions={followUpInstructions}
                  isVisitActive={isVisitActive}
                  orderType={orderType}
                  id={id}
                  isProvider={isProvider}
                  saveFollowUpInstructions={saveFollowUpInstructions}
                />
              </>
            )}

            {isOrderActiveForProvider && isVisitActive ? (
              <Section
                title='Nurse Has Not Yet Administered Order'
                horizontalRule
              />
            ) : null}
          </div>
        </StatusCard>
      )
    }
  )
}
