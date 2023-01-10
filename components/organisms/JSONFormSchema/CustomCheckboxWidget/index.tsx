import React from 'react'
import { Container } from 'react-bootstrap'
import { WidgetProps } from '@rjsf/core'
import { Checkbox } from 'components/atoms/Checkbox'

type optionValueType = number | string

export interface CustomCheckboxWidgetProps extends WidgetProps {
  options: {
    enumOptions: Array<{ label: string; value: optionValueType }>
  }
}

const CustomCheckboxWidget = ({
  label: widgetLabel,
  id,
  disabled,
  required,
  options: { enumOptions },
  onChange,
  value: selectedValue,
  schema,
  uiSchema,
}: CustomCheckboxWidgetProps) => {
  const widgetTitle = uiSchema?.['ui:title'] || widgetLabel

  const _onChange = ({ target }) => {
    const { value, checked } = target
    return onChange(schema.type == 'boolean' ? checked : value)
  }

  const valueLabels = enumOptions.map(
    ({ label: optionLabel }, index) =>
      uiSchema?.['ui:enumNames']?.[index] || optionLabel
  )

  return (
    <Checkbox
      name={widgetLabel}
      id={`${id}-${widgetLabel}`}
      onChange={_onChange}
      checked={selectedValue}
      className=''
      disabled={disabled}
    >
      {/* {selectedValue ? valueLabels?.[0] ?? 'Yes' : valueLabels?.[1] ?? 'No'} */}
      {widgetTitle}
      {required ? '*' : null}
    </Checkbox>
  )
}

export default CustomCheckboxWidget
