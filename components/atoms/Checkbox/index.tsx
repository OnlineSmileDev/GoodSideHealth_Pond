import classNames from 'classnames'
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
  useRef,
} from 'react'

type CustomCheckboxProps = {
  ariaLabel?: string
  children?: ReactNode
  className?: string
}

export type CheckboxProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  CustomCheckboxProps
export const Checkbox = ({
  checked,
  ariaLabel,
  className,
  children,
  ...props
}: CheckboxProps) => {
  const inputRef = useRef(null)
  const handleClick = () => {
    inputRef.current.click()
  }
  return (
    <div
      className={classNames(
        'tw-flex tw-flex-row tw-items-center',
        'tw-cursor-pointer tw-w-full',
        className
      )}
    >
      <input
        type='checkbox'
        checked={checked}
        ref={inputRef}
        className=''
        aria-label={ariaLabel}
        {...props}
      />

      {children && (
        <span
          className='tw-font-hind tw-text-sm tw-mt-1 tw-ml-1'
          onClick={handleClick}
        >
          {children}
        </span>
      )}
    </div>
  )
}
