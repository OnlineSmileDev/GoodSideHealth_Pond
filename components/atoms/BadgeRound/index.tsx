import classNames from 'classnames'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export enum BADGE_VARIANT {
  WARNING = 'warning',
  PRIMARY = 'primary',
  LIGHTEST = 'lightest',
}

type CustomBadgeRoundProps = {
  variant: BADGE_VARIANT
  className?: string
}

export type BadgeRoundProps = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> &
  CustomBadgeRoundProps

export const BadgeRound = ({
  variant,
  children,
  className,
  ...props
}: BadgeRoundProps) => {
  const { WARNING, PRIMARY, LIGHTEST } = BADGE_VARIANT
  return (
    <span
      {...props}
      className={classNames(
        'tw-font-hind tw-h-6 tw-w-6 tw-text-2.5 tw-mr-2 tw-rounded-full tw-inline-flex tw-items-center tw-justify-center',
        {
          'tw-bg-warning tw-border-warning tw-text-white': variant === WARNING,
          'tw-bg-primary tw-border-primary tw-text-white': variant === PRIMARY,
          'tw-bg-light-lightest tw-border-light-lightest tw-text-black':
            variant === LIGHTEST,
        },
        className
      )}
    >
      {children}
    </span>
  )
}
