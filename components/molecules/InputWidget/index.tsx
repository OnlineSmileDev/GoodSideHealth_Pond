import classNames from 'classnames'
import {
  DetailedHTMLProps,
  SelectHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  LegacyRef,
} from 'react'
import NumberFormat, {
  NumberFormatPropsBase,
  NumberFormatValues,
} from 'react-number-format'
import { CustomDatePicker } from 'components/atoms/DatePicker'
import { getBackendFormattedDate } from 'utils/datePicker'

export type CustomInputControlProps = {
  as?: string
  forwardedRef?: LegacyRef<HTMLInputElement> & LegacyRef<HTMLSelectElement>
  format?: string
  setFieldValue?: (key: string, value: string) => void
  setFieldError?: (key: string, value: string) => void
  isAllowed?: (values: NumberFormatValues) => boolean
  errorMessage?: string
}

type NumberFormatProps = Pick<
  NumberFormatPropsBase,
  | 'type'
  | 'name'
  | 'placeholder'
  | 'className'
  | 'value'
  | 'onValueChange'
  | 'maxLength'
  | 'allowNegative'
  | 'required'
  | 'disabled'
  | 'format'
  | 'onBlur'
  | 'mask'
>

export type SelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>
export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export type TextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

export type InputWidgetProps = SelectProps &
  InputProps &
  CustomInputControlProps &
  NumberFormatProps &
  TextAreaProps

export const InputWidget = ({
  as,
  className,
  children,
  forwardedRef,
  isAllowed,
  errorMessage,
  ...props
}: InputWidgetProps) => {
  const {
    name,
    value,
    format,
    disabled,
    onBlur,
    setFieldValue,
    setFieldError,
  } = props

  switch (as) {
    case 'number':
      return (
        <>
          {/* @ts-ignore */}
          <NumberFormat
            className={classNames(
              'tw-block tw-h-10 tw-w-full tw-border tw-rounded tw-border-black tw-px-3 tw-py-1.5 tw-text-xs tw-text-black tw-font-bold',
              {
                'tw-bg-gray-100 tw-text-gray-600': disabled,
              },
              className
            )}
            isAllowed={isAllowed}
            {...props}
          />
        </>
      )
    case 'select':
      return (
        <select
          className={classNames(
            'tw-block tw-h-10 tw-w-full tw-border tw-rounded tw-border-black tw-px-3 tw-py-1.5 tw-text-xs tw-text-black tw-font-bold tw-bg-arrowDownBlue tw-bg-no-repeat tw-bg-center-right-15 tw-bg-20 tw-appearance-none',
            {
              'tw-bg-gray-100 tw-text-gray-600': disabled,
            },
            className
          )}
          ref={forwardedRef}
          {...props}
        >
          {children}
        </select>
      )
    case 'textarea':
      return (
        <textarea
          className={classNames(
            'tw-text-xs tw-rounded tw-border tw-font-bold tw-bg-white tw-w-full tw-block tw-border-gray-700 tw-px-3 tw-py-1.5 tw-resize-none',
            {
              'tw-bg-gray-100 tw-text-gray-600': disabled,
            },
            {
              'tw-border-danger-darker': errorMessage,
            },
            className
          )}
          {...props}
        />
      )
    case 'readOnly':
      return (
        <input
          className={classNames(
            'tw-block tw-h-10 tw-w-full tw-py-1.5 tw-text-xs tw-bg-white',
            className
          )}
          disabled
          readOnly
          {...props}
        />
      )
    case 'search':
      return (
        <input
          className={classNames(
            'tw-block tw-h-10 tw-w-full tw-border tw-rounded tw-border-pondBlack tw-px-4 tw-py-1.5 tw-text-xs tw-font-hind tw-text-black tw-placeholder:text-gray-400',
            {
              'tw-bg-gray-100 tw-text-gray-600': disabled,
            },
            className
          )}
          {...props}
        />
      )
    case 'file':
      return (
        <input
          type='file'
          className={className}
          ref={forwardedRef}
          {...props}
        />
      )
    case 'date':
      return (
        <CustomDatePicker
          name={name}
          date={value}
          disabled={disabled}
          dateFormat={format}
          onBlur={onBlur}
          setDate={(value) =>
            setFieldValue(name, getBackendFormattedDate(value))
          }
          setError={() =>
            setFieldError(name, 'Date format should be ' + format.toUpperCase())
          }
        />
      )
    case 'nullField':
      return (
        <input
          className={classNames(
            'tw-block tw-h-10 tw-w-full tw-py-1.5 tw-bg-white',
            className
          )}
          disabled
          readOnly
        />
      )
    default:
      return (
        <input
          className={classNames(
            'tw-block tw-h-10 tw-w-full tw-border tw-rounded tw-border-black tw-px-3 tw-py-1.5 tw-text-xs tw-text-black tw-font-bold',
            {
              'tw-bg-gray-100 tw-text-gray-600': disabled,
            },
            {
              'tw-border-danger-darker': errorMessage,
            },
            className
          )}
          ref={forwardedRef}
          {...props}
        />
      )
  }
}
