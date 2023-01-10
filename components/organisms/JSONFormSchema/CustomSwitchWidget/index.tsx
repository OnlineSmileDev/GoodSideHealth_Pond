import React from 'react'
import { Container } from 'react-bootstrap'
import { WidgetProps } from '@rjsf/core'
import { Switch } from 'components/atoms/Switch'

type optionValueType = number | string

export interface CustomSwitchWidgetProps extends WidgetProps {
  options: {
    enumOptions: Array<{ label: string; value: optionValueType }>
  }
}

const CustomSwitchWidget = ({
  label: widgetLabel,
  id,
  disabled,
  required,
  options: { enumOptions },
  onChange,
  value: selectedValue,
  schema,
  uiSchema,
}: CustomSwitchWidgetProps) => {
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
    <Container className='pt-3 px-0 tw-ml-0'>
      <label htmlFor={id}>
        {widgetTitle}
        {required ? '*' : null}
      </label>

      <Switch
        name={widgetLabel}
        id={`${id}-${widgetLabel}`}
        onChange={_onChange}
        checked={selectedValue}
        className='tw-cursor-pointer tw-w-auto xl:tw-w-32'
        disabled={disabled}
      >
        <span className='tw-mr-2'>
          {selectedValue ? valueLabels?.[0] ?? 'Yes' : valueLabels?.[1] ?? 'No'}
        </span>
      </Switch>
    </Container>
  )
}

export default CustomSwitchWidget
