import classNames from 'classnames'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export type ValueProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const Value = ({ className, children, ...props }: ValueProps) => {
  return (
    <div
      className={classNames('tw-text-sm tw-font-hind', className)}
      {...props}
    >
      {children || 'N/A'}
    </div>
  )
}
