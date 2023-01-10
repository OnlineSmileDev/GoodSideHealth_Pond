import React, { useState } from 'react'
import { ComponentMeta, Story } from '@storybook/react'
import CustomRadioWidget, { CustomRadioWidgetProps } from './index'

export default {
  title: 'organisms/JSONFormSchema/CustomRadioWidget',
  component: CustomRadioWidget,
} as ComponentMeta<typeof CustomRadioWidget>

const enumOptions = [
  { value: '1', label: 'One' },
  { value: '2', label: 'Two' },
  { value: '3', label: 'Three' },
  { value: '4', label: 'Four' },
]

const uiSchema = {
  'ui:title': 'Schema Title',
  'ui:enumNames': ['Schema One', 'Schema Two', 'Schema Three', 'Schema Four'],
}

const Template: Story<CustomRadioWidgetProps> = (args) => {
  const [state, setState] = useState()
  const onChange = (val) => {
    console.log(`${val} clicked`)
    setState(val)
  }

  return <CustomRadioWidget {...args} onChange={onChange} value={state} />
}

export const Primary = Template.bind({}) as Story<CustomRadioWidgetProps>

Primary.args = {
  id: 'customradiowidget',
  label: 'Widget Title Label',
  required: false,
  disabled: false,
  options: { enumOptions },
}

export const WithSchema = Template.bind({}) as Story<CustomRadioWidgetProps>

WithSchema.args = {
  id: 'customradiowidget',
  label: 'Widget Title Label',
  required: false,
  disabled: false,
  options: { enumOptions },
  uiSchema: uiSchema,
}
