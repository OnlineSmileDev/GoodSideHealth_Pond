import classNames from 'classnames'
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
  useRef,
} from 'react'

type CustomSwitchProps = {
  ariaLabel?: string
  children?: ReactNode
  className?: string
}

export type SwitchProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  CustomSwitchProps
export const Switch = ({
  checked,
  ariaLabel,
  className,
  children,
  ...props
}: SwitchProps) => {
  const inputRef = useRef(null)
  const handleClick = () => {
    inputRef.current.click()
  }
  return (
    <div
      className={classNames('tw-flex tw-flex-row tw-items-center', className)}
      onClick={handleClick}
    >
      <div
        className={classNames(
          'tw-rounded-xl tw-p-px tw-w-12.25 tw-h-5 tw-bg-opacity-50 tw-m-2 tw-cursor-pointer',
          {
            'tw-bg-danger-darker': !checked,
            'tw-bg-success': checked,
          }
        )}
        aria-label={ariaLabel}
      >
        <input
          type='checkbox'
          checked={checked}
          ref={inputRef}
          className='tw-hidden'
          aria-label={ariaLabel}
          {...props}
        />
        <span
          className={classNames(
            'tw-rounded-full tw-w-5 tw-h-5 tw-transform tw-mx-auto tw-duration-200 tw-ease-in-out tw-block tw--mt-px',
            {
              'tw--translate-x-3.5 tw-bg-danger-darker': !checked,
              'tw-translate-x-3.5 tw-bg-success': checked,
            }
          )}
        />
      </div>
      {children && (
        <span className='tw-font-hind tw-text-sm tw-mt-1'>{children}</span>
      )}
    </div>
  )
}
