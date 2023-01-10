import React, { useState } from 'react'
import { ComponentMeta, Story } from '@storybook/react'
import { WidgetProps } from '@rjsf/core'
import CustomPHQResultsWidget from './index'

export default {
  title: 'organisms/JSONFormSchema/CustomPHQResultsWidget',
  component: CustomPHQResultsWidget,
} as ComponentMeta<typeof CustomPHQResultsWidget>

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

const Template: Story<WidgetProps> = (args) => {
  const [state, setState] = useState()
  const onChange = (val) => {
    console.log(`${val} clicked`)
    setState(val)
  }

  return <CustomPHQResultsWidget {...args} onChange={onChange} value={state} />
}

export const Primary = Template.bind({}) as Story<WidgetProps>

Primary.args = {
  id: 'customphqresultswidget',
  label: 'Widget Title Label',
  value: 0,
}

export const WithSchema = Template.bind({}) as Story<WidgetProps>

WithSchema.args = {
  id: 'customphqresultswidget',
  label: 'Widget Title Label',
  value: 0,
  uiSchema: uiSchema,
}
