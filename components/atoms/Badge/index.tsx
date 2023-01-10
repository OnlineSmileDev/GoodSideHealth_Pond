import classNames from 'classnames'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export enum BADGE_OUTLINE_VARIANT {
  OUTLINE_DANGER = 'outline-danger',
  OUTLINE_WARNING = 'outline-warning',
  OUTLINE_SUCCESS = 'outline-success',
}

type CustomBadgeProps = {
  variant: BADGE_OUTLINE_VARIANT
}

export type BadgeProps = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> &
  CustomBadgeProps

export const Badge = ({
  className,
  variant,
  children,
  ...props
}: BadgeProps) => {
  const { OUTLINE_DANGER, OUTLINE_WARNING, OUTLINE_SUCCESS } =
    BADGE_OUTLINE_VARIANT
  return (
    <span
      {...props}
      className={classNames(
        'tw-w-32 tw-h-8 tw-border tw-font-hind tw-font-bold tw-text-sm tw-rounded tw-text-center tw-p-1.5',
        className,
        {
          'tw-border-danger tw-text-danger': variant === OUTLINE_DANGER,
          'tw-border-warning tw-text-warning': variant === OUTLINE_WARNING,
          'tw-border-success tw-text-success': variant === OUTLINE_SUCCESS,
        }
      )}
    >
      {children}
    </span>
  )
}
