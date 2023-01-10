import { DetailedHTMLProps, HTMLAttributes } from 'react'
import classNames from 'classnames'
import { Label } from 'components/atoms/Label'

export type CustomInputGroupProps = {
  label?: string
  errorMessage?: string
}

export type InputGroupProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  CustomInputGroupProps

export const InputGroup = ({
  id,
  className,
  label,
  children,
}: InputGroupProps) => {
  return (
    <div id={id} className={classNames('tw-my-2', className)}>
      <Label>{label}</Label>
      {children}
    </div>
  )
}
