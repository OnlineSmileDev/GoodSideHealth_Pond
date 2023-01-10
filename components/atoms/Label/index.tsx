import classNames from 'classnames'
import { DetailedHTMLProps, LabelHTMLAttributes } from 'react'

export type LabelProps = DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>

export const Label = ({ className, children, ...props }: LabelProps) => {
  return (
    <label
      className={classNames(
        'tw-font-bold tw-leading-6 tw-text-sm tw-font-hind',
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
}
