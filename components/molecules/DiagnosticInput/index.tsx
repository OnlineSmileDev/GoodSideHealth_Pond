import React from 'react'
import { Switch } from 'components/atoms/Switch'
import { InputControl } from 'components/molecules/InputControl'

export const DIAGNOSIS_RESULTS = {
  NORMAL: 'normal',
  ABNORMAL: 'abnormal',
}

export type DiagnosticInputProps = {
  name: string
  toggleValue: string
  notesValue: string
  handleChange: (fieldName: string, value: string) => void
  errorMessage?: string
  handleBlur?: (event: React.FocusEvent) => void
}

export const DiagnosticInput = ({
  name,
  toggleValue,
  notesValue,
  handleChange,
  errorMessage,
  handleBlur,
}: DiagnosticInputProps) => {
  const isNormalDiagnosed = toggleValue === DIAGNOSIS_RESULTS.NORMAL
  return (
    <>
      <div className='tw-w-full tw-flex tw-items-center'>
        <Switch
          name={name}
          onChange={(ev) =>
            handleChange(
              name,
              ev.target.checked
                ? DIAGNOSIS_RESULTS.NORMAL
                : DIAGNOSIS_RESULTS.ABNORMAL
            )
          }
          checked={isNormalDiagnosed}
          className='tw-cursor-pointer tw-w-auto xl:tw-w-32'
        >
          <span className='tw-mr-2'>
            {isNormalDiagnosed ? 'Normal' : 'Abnormal'}
          </span>
        </Switch>
      </div>
      {toggleValue !== DIAGNOSIS_RESULTS.NORMAL && (
        <div className='tw-flex tw-flex-col tw-pt-4'>
          <div className='tw-font-hind tw-font-bold tw-text-sm tw-w-full'>
            Abnormal Findings
          </div>
          <InputControl
            name={`${name}_notes`}
            as='textarea'
            rows={5}
            className='tw-mt-1.25'
            placeholder='Your Message...'
            maxLength={2000}
            value={notesValue || ''}
            onChange={(ev) => handleChange(`${name}_notes`, ev.target.value)}
            onBlur={handleBlur}
            errorMessage={errorMessage}
          />
        </div>
      )}
    </>
  )
}
