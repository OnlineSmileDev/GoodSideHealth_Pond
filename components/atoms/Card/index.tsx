import classNames from 'classnames'
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export enum CARD_VARIANT {
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  PURPLE = 'purple',
}

type CustomCardProps = {
  variant?: CARD_VARIANT
  children?: ReactNode
  dataTest?: string
}
export type CardProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  CustomCardProps

export const Card = ({
  children,
  className,
  variant,
  dataTest,
  ...props
}: CardProps) => {
  const { SUCCESS, DANGER, WARNING, PURPLE } = CARD_VARIANT
  return (
    <div
      {...props}
      className={classNames(
        'tw-containter tw-bg-white tw-relative tw-shadow-sm tw-mx-auto tw-p-4 tw-rounded tw-w-full',
        {
          'tw-border-l-10 tw-border-success': variant === SUCCESS,
          'tw-border-l-10 tw-border-danger-darker': variant === DANGER,
          'tw-border-l-10 tw-border-warning': variant === WARNING,
          'tw-border-l-10 tw-border-purple': variant === PURPLE,
        },
        className
      )}
      data-test={dataTest}
    >
      {children}
    </div>
  )
}
