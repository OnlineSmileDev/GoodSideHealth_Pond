import { ReactNode } from 'react'
import classNames from 'classnames'

export enum INDICATOR_VARIANT {
  SUCCESS = 'success',
  WARNING = 'warning',
  PRIMARY = 'primary',
}

export type IndicatorProps = {
  variant?: INDICATOR_VARIANT
  children?: ReactNode
  dataTestId?: string
}
export const Indicator = ({
  variant = INDICATOR_VARIANT.PRIMARY,
  children,
  dataTestId,
}: IndicatorProps) => {
  const { PRIMARY, SUCCESS, WARNING } = INDICATOR_VARIANT
  return (
    <>
      <span
        className={classNames(
          'tw-h-2.5 tw-w-2.5 tw-inline-block tw-rounded-full mr-2',
          {
            'tw-bg-primary': variant === PRIMARY,
            'tw-bg-success': variant === SUCCESS,
            'tw-bg-warning': variant === WARNING,
          }
        )}
        data-testid={dataTestId}
      />
      {children && <span className='tw-text-sm'>{`${children}`}</span>}
    </>
  )
}
