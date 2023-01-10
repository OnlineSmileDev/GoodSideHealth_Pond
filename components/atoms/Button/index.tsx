import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import classNames from 'classnames'
import { Image } from 'react-bootstrap'
import Icons from 'src/assets/icons'

export enum BUTTON_VARIANT {
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  PRIMARY = 'primary',
  LIGHT = 'light',
  LIGHTEST = 'lightest',
}

export enum BUTTON_OUTLINE_VARIANT {
  OUTLINE_DARK = 'outline-dark',
}

export type CustomButtonProps = {
  isLoading?: boolean
  variant?: BUTTON_VARIANT
  size?: string
  outline?: BUTTON_OUTLINE_VARIANT
}

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  CustomButtonProps

const { DANGER, WARNING, PRIMARY, SUCCESS, LIGHT, LIGHTEST } = BUTTON_VARIANT

export const Button = ({
  type = 'button',
  className,
  disabled,
  isLoading,
  children,
  variant = PRIMARY,
  size = 'md',
  outline,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      type={type}
      className={classNames(
        'tw-h-10 tw-rounded',
        'tw-flex tw-justify-center tw-items-center',
        'tw-font-bold tw-font-hind tw-text-xs',
        {
          'tw-bg-danger hover:tw-bg-danger-lighter': variant === DANGER,
          'tw-bg-warning hover:tw-bg-warning-lighter': variant === WARNING,
          'tw-bg-primary hover:tw-bg-primary-lighter': variant === PRIMARY,
          'tw-bg-success hover:tw-bg-success-lighter': variant === SUCCESS,
          'tw-bg-light-lightest hover:tw-bg-light-lightest':
            variant === LIGHTEST,
          'tw-bg-light tw-text-black hover:tw-bg-light-lighter':
            variant === LIGHT,
          'tw-text-white': variant !== LIGHT && variant !== LIGHTEST,
          'tw-border-black tw-border':
            outline === BUTTON_OUTLINE_VARIANT.OUTLINE_DARK,
          'tw-bg-opacity-60 hover:tw-bg-opacity-60 tw-cursor-default':
            disabled || isLoading,
          'tw-w-6.25 tw-h-6.25': size === 'xs',
          'tw-w-100': size === 'sm',
          'tw-w-36 ': size === 'md',
          'tw-w-200': size === 'lg',
        },
        className
      )}
      disabled={disabled || isLoading}
    >
      {isLoading && <LoadingIcon />}
      {children}
    </button>
  )
}

export const LoadingIcon = () => (
  <Image
    src={Icons.whiteLoadingIcon}
    alt='loadingIcon'
    className='tw-w-6 tw-mr-2'
  />
)
