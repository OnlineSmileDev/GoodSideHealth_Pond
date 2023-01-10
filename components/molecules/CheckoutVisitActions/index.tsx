import React from 'react'
import { ButtonList } from 'components/molecules/ButtonList'
import { BUTTON_VARIANT } from 'components/atoms/Button'

export type CheckoutVisitActionsProps = {
  returnToSession: () => void
  endVisit: () => void
}

export const CheckoutVisitActions = ({
  returnToSession,
  endVisit,
}: CheckoutVisitActionsProps) => {
  const list = [
    {
      variant: BUTTON_VARIANT.PRIMARY,
      clickHandler: () => returnToSession(),
      buttonText: 'Return To Session',
      dataTest: 'returnToSession',
      style: 'tw-w-full tw-mb-2.5',
    },
    {
      variant: BUTTON_VARIANT.DANGER,
      clickHandler: () => endVisit(),
      buttonText: 'End Visit',
      dataTest: 'endVisit',
      style: 'tw-w-full',
    },
  ]
  return <ButtonList className='tw-flex tw-flex-col' list={list} />
}
