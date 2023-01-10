import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import {
  InputControl,
  InputControlProps,
} from 'components/molecules/InputControl'
import { InputGroup } from 'components/molecules/InputGroup'
import { useState } from 'react'
import { TrashIcon } from '@heroicons/react/solid'

const thunk = (...args: any) => {}

export type BloodPressureReading = {
  pressure_systolic?: number
  pressure_diastolic?: number
}

export type BloodPressureFormProps =
  | InputControlProps
  | {
      value?: BloodPressureReading
      onValueChange: (val: BloodPressureReading) => void
    }

export const BloodPressureForm = ({
  value,
  onValueChange = thunk,
  ...props
}: BloodPressureFormProps) => {
  const [readings, setReadings] = useState<Array<BloodPressureReading>>(
    (value as BloodPressureReading) !== undefined
      ? [value as BloodPressureReading]
      : []
  )
  const sendLatest = (latest) => onValueChange(latest[latest.length - 1])
  const addReading = () => {
    const newReadings = [
      ...readings,
      {
        pressure_systolic: undefined,
        pressure_diastolic: undefined,
      },
    ]
    setReadings(newReadings)
    sendLatest(newReadings)
  }
  const updateReading = (val: BloodPressureReading, i: number) => {
    const newReadings = [...readings.slice(0, i), val, ...readings.slice(i + 1)]
    setReadings(newReadings)
    sendLatest(newReadings)
  }
  const removeReading = (i: number) => {
    const newReadings = [...readings.slice(0, i), ...readings.slice(i + 1)]
    setReadings(newReadings)
    sendLatest(newReadings)
  }

  return (
    <div className='tw-flex-wrap'>
      {readings.map((reading, i) => (
        <InputGroup
          id='bloodPressure'
          className='tw-item-center tw-mb-4'
          label='Blood Pressure'
          key={`blood-pressure-${i}`}
        >
          <div className='tw-col-span-2 tw-flex tw-items-center tw-text-center tw-font-hind'>
            <InputControl
              as='number'
              name={`pressure_systolic_${i}`}
              value={reading.pressure_systolic}
              placeholder='120'
              className='tw-flex-auto tw-mr-1'
              maxLength={3}
              onValueChange={({ value }) =>
                updateReading({ ...reading, pressure_systolic: +value }, i)
              }
              data-testid={`pressure-systolic-${i}`}
              {...props}
            />

            <div className='tw-mr-1'>/</div>

            <InputControl
              as='number'
              name={`pressure-diastolic_${i}`}
              value={reading.pressure_diastolic}
              placeholder='80'
              className='tw-flex-auto tw-mr-1'
              maxLength={3}
              onValueChange={({ value }) =>
                updateReading({ ...reading, pressure_diastolic: +value }, i)
              }
              data-testid={`pressure-diastolic-${i}`}
              {...props}
            />

            {i !== 0 && i <= readings.length - 1 && (
              <Button
                size='xs'
                onClick={() => removeReading(i)}
                data-testid={`remove-reading-${i}`}
              >
                <TrashIcon className='tw-h-5 tw-w-5 tw-text-danger' />
              </Button>
            )}
          </div>
        </InputGroup>
      ))}
      <Button variant={BUTTON_VARIANT.LIGHTEST} onClick={() => addReading()}>
        <p>Add Blood Pressure Test</p>
      </Button>
    </div>
  )
}
