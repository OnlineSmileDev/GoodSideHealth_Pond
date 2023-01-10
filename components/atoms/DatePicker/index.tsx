import React, { useState } from 'react'
import classNames from 'classnames'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { Button } from 'react-bootstrap'
import moment from 'moment/moment'
import { getDateFromLabel, isValidDateFormat } from 'utils/datePicker'

export enum DATE_PICKER_VARIANT {
  PRIMARY = 'primary',
  DARK = 'dark',
}

export type CustomDatePickerProps = {
  date: string
  variant: DATE_PICKER_VARIANT
  showNoFutureDates?: boolean
  highlightDates?: Array<any>
  handleAllTimeButtonClick?: () => void
  hasAllTimeButton?: boolean
  setDate: (value) => void
  setError?: () => void
  dateFormat: string
} & ReactDatePickerProps

export const CustomDatePicker = ({
  date,
  variant = DATE_PICKER_VARIANT.PRIMARY,
  showNoFutureDates = false,
  highlightDates = [],
  handleAllTimeButtonClick,
  hasAllTimeButton = false,
  setDate,
  setError,
  placeholderText,
  dateFormat = 'MM/dd/yyyy',
  ...props
}: CustomDatePickerProps) => {
  const [datePickerRef, setDatePickerRef] = useState(null)
  const dateObj = date && moment(date, 'YYYY-MM-DD').toDate()

  const handleChange = (e) => {
    const { value, ariaLabel } = e.target
    const isClickEvent = e.type === 'click'
    const date = isClickEvent ? getDateFromLabel(ariaLabel) : value
    //@ts-ignore
    const isValid = isValidDateFormat(date, dateFormat.toUpperCase())
    if (isClickEvent && props.onBlur) props.onBlur(e)

    if (isValid || !value) setDate(date)
    else if (setError) setError()
  }

  return (
    <DatePicker
      selected={dateObj}
      className={classNames(
        'tw-block tw-h-10 tw-w-full tw-border tw-rounded tw-border-black tw-px-3 tw-py-1.5 tw-text-xs tw-text-black calender-input',
        {
          'tw-font-bold': variant === DATE_PICKER_VARIANT.PRIMARY,
          'tw-font-hind tw-border-pondBlack tw-placeholder-black calender-input-black':
            variant === DATE_PICKER_VARIANT.DARK,
        }
      )}
      showPopperArrow={false}
      highlightDates={highlightDates}
      ref={(r) => setDatePickerRef(r)}
      maxDate={showNoFutureDates && new Date()}
      onChangeRaw={handleChange}
      showYearDropdown
      showMonthDropdown
      dropdownMode='select'
      placeholderText={placeholderText}
      dateFormat={dateFormat}
      {...props}
    >
      {hasAllTimeButton && (
        <Button
          className='btn-block'
          variant='primary'
          size='sm'
          onClick={() => {
            handleAllTimeButtonClick()
            datePickerRef.setOpen(false)
          }}
        >
          All Time
        </Button>
      )}
    </DatePicker>
  )
}
