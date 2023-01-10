import React, { useRef, useState, useEffect } from 'react'
import { InputWidget } from 'components/molecules/InputWidget'
import {
  getTimeInCustomInputFormat,
  getTimeIn24HourFormat,
  getTimeIn12HourFormat,
} from 'utils/getFormattedTime'
import { ARROW_LEFT, ARROW_RIGHT } from 'constants/keyCodes'

const MAX_MINUTES = 59
const MAX_INPUT_LENGTH = 2
const MIN_HOURS = '01'
const AM = 'AM'
const PM = 'PM'
const SECOND_POSITION = 2
const HOURS = 'hours'
const MINUTES = 'minutes'
const MERIDIAN_INDICATOR = 'meridianIndicator'
const TAB_KEY = 'Tab'
const MAX_HOURS = 12
const MIN_INVALID_HOUR_INPUT = '00'

export type TimeInputProps = {
  time: {}
  setTime: (time: string) => void
}

export const TimeInput = ({ time, setTime }: TimeInputProps) => {
  const hourRef = useRef(null)
  const minRef = useRef(null)
  const meridianRef = useRef(null)

  const [formattedTime, setFormattedTime] = useState(
    getTimeInCustomInputFormat(time)
  )

  useEffect(() => {
    if (isValidTime(getTimeIn12HourFormat(formattedTime))) {
      setTime(getTimeIn24HourFormat(formattedTime))
    }
  }, [formattedTime, setTime])

  const handleHourInput = (ev) => {
    const value = ev.target.value
    const isInValidHourInputValue =
      parseInt(value) > MAX_HOURS || value === MIN_INVALID_HOUR_INPUT
    if (isInValidHourInputValue) {
      setFormattedTime(formattedTime)
    } else {
      setFormattedTime({ ...formattedTime, hours: value })
    }
  }

  const handleMinuteInput = (ev) => {
    const value = ev.target.value
    const isInvalidMinuteInputValue = value > MAX_MINUTES
    if (isInvalidMinuteInputValue) {
      setFormattedTime(formattedTime)
    } else {
      setFormattedTime({ ...formattedTime, minutes: value })
    }
  }

  const handleChange = (ev) => {
    const value = ev.target.value
    const fieldId = ev.target.id

    if (fieldId === HOURS && isNumberKey(value)) {
      handleHourInput(ev)
    } else if (fieldId === MINUTES && isNumberKey(value)) {
      handleMinuteInput(ev)
    } else if (fieldId === MERIDIAN_INDICATOR) {
      setFormattedTime({
        ...formattedTime,
        meridianIndicator: value,
      })
    }
  }

  const handleTimeInput = (ev) => {
    const isTabKey = ev.key === TAB_KEY
    const isArrowLeft = ev.key === ARROW_LEFT
    const isArrowRight = ev.key === ARROW_RIGHT
    const fieldId = ev.target.id
    const inputLength = ev.target.value.length
    if (!isTabKey && !isArrowLeft && !isArrowRight) {
      if (fieldId === HOURS) {
        if (inputLength === MAX_INPUT_LENGTH) {
          minRef.current.focus()
        }
      } else {
        if (inputLength === MAX_INPUT_LENGTH) {
          meridianRef.current.focus()
        }
      }
    }
  }

  const handleBlur = (ev) => {
    const fieldId = ev.target.id
    const fieldValue = ev.target.value
    const isHourInput = fieldId === HOURS

    if (fieldValue.length < MAX_INPUT_LENGTH) {
      const formattedFieldValue =
        isHourInput && !+fieldValue ? MIN_HOURS : fieldValue

      setFormattedTime({
        ...formattedTime,
        [fieldId]: String(formattedFieldValue).padStart(SECOND_POSITION, '0'),
      })
    }
  }

  const isNumberKey = (value) => {
    const numberInput = /^[0-9\b]+$/
    return value === '' || numberInput.test(value)
  }

  const isValidTime = (value) => {
    const timeInput = /(((0[1-9])|(1[0-2])):([0-5])([0-9])\s(A|P)M)/
    return timeInput.test(value)
  }

  return (
    <div className='tw-flex tw-items-center'>
      <div className='tw-w-12'>
        <InputWidget
          id={HOURS}
          forwardedRef={hourRef}
          className='tw-text-center'
          maxLength={2}
          onKeyUp={handleTimeInput}
          value={formattedTime.hours}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='--'
          data-testid='input-hours'
          onFocusCapture={(ev: any) =>
            setFormattedTime({
              ...formattedTime,
              [ev.target.id]: parseInt(ev.target.value),
            })
          }
        />
      </div>
      <span className='tw-mx-2 tw-font-bold'>:</span>
      <div className='tw-w-12 '>
        <InputWidget
          id={MINUTES}
          forwardedRef={minRef}
          className='tw-text-center'
          maxLength={2}
          onKeyUp={handleTimeInput}
          value={formattedTime.minutes}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='--'
          data-testid='input-minutes'
          onFocusCapture={(ev: any) =>
            setFormattedTime({
              ...formattedTime,
              [ev.target.id]: parseInt(ev.target.value),
            })
          }
        />
      </div>

      <div className='tw-w-24'>
        <InputWidget
          as='select'
          id='meridianIndicator'
          forwardedRef={meridianRef}
          className='tw-ml-2'
          value={formattedTime.meridianIndicator}
          onChange={handleChange}
        >
          <option value={PM}>PM</option>
          <option value={AM}>AM</option>
        </InputWidget>
      </div>
    </div>
  )
}
