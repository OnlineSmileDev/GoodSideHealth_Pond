import React from 'react'
import classNames from 'classnames'
import { WidgetProps } from '@rjsf/core'
import RadioOption from './RadioOption'

type optionValueType = number | string

export interface CustomRadioWidgetProps extends WidgetProps {
  options: {
    enumOptions: Array<{ label: string; value: optionValueType }>
  }
}

const CustomRadioWidget = ({
  label: widgetLabel,
  id,
  disabled,
  required,
  options: { enumOptions },
  onChange,
  value: selectedValue,
  uiSchema,
}: CustomRadioWidgetProps) => {
  const widgetTitle = uiSchema?.['ui:title'] || widgetLabel
  const isVertical = uiSchema?.['ui:vertical']

  return (
    <div className='pt-3 px-0 tw-ml-0'>
      <label htmlFor={id}>
        {widgetTitle}
        {required ? '*' : null}
      </label>

      <div
        className={classNames('tw-flex', {
          'tw-flex-col': isVertical,
          'tw-flex-row': !isVertical,
        })}
      >
        {enumOptions.map(({ value, label: optionLabel }, index) => {
          const optionTitle = uiSchema?.['ui:enumNames']?.[index] || optionLabel

          return (
            <RadioOption
              key={`${widgetLabel}-${value}`}
              disabled={disabled}
              id={`${id}-${value}`} // composite id otherwise the id will be the same for the same radio option every question.
              name={`${id}-${value}`}
              value={value}
              label={optionTitle}
              onChange={onChange}
              checked={String(selectedValue) === value}
              className=''
            />
          )
        })}
      </div>
    </div>
  )
}

export default CustomRadioWidget
