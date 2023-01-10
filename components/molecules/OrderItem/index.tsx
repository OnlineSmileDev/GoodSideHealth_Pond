import { ReactNode } from 'react'
import classNames from 'classnames'
import { Label } from 'components/atoms/Label'
import { Value } from 'components/atoms/Value'

export enum ORDER_ITEM_VARIANT {
  LIGHT = 'tw-bg-light',
  WHITE = 'tw-bg-white',
}

export type OrderItemProps = {
  label?: string
  value?: string
  variant?: ORDER_ITEM_VARIANT
  showIndicator?: boolean
  children?: ReactNode
  dataTestId?: string
}

export const OrderItem = ({
  label,
  value,
  variant = ORDER_ITEM_VARIANT.WHITE,
  showIndicator,
  children,
  dataTestId,
}: OrderItemProps) => (
  <div
    className={classNames(
      'tw-grid tw-grid-cols-1 tw-my-1.25 tw-py-2.5 tw-px-3.5',
      { 'tw-border-l-5 tw-border-danger-darker': showIndicator },
      variant
    )}
    data-testid={dataTestId}
  >
    {children || (
      <>
        <Label className='tw-py-0.5 tw-mb-0'>{label}</Label>
        <Value className='tw-py-0.5'>{value}</Value>
      </>
    )}
  </div>
)
