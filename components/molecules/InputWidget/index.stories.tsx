import React from 'react'
import { Meta, Story } from '@storybook/react'
import { InputWidget, InputWidgetProps } from './index'

const StoryMeta = {
  title: 'molecules/InputWidget',
  component: InputWidget,
} as Meta
export default StoryMeta

const Template: Story<InputWidgetProps> = (args) => <InputWidget {...args} />

export const TextWidget = Template.bind({}) as Story
TextWidget.args = {
  as: 'text',
  type: 'text',
  placeholder: 'Placeholder',
}

export const NumberWidget = Template.bind({}) as Story
NumberWidget.args = {
  as: 'number',
  type: 'text',
  placeholder: 'Placeholder',
}

export const TextArea = Template.bind({}) as Story
TextArea.args = {
  as: 'textarea',
  type: 'TextArea',
  cols: 30,
  rows: 4,
}

export const Select = Template.bind({}) as Story
Select.args = {
  as: 'select',
  type: 'select',
  children: (
    <>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </>
  ),
}
export const DatePicker = Template.bind({}) as Story
DatePicker.args = {
  as: 'date',
  value: '1995-08-04',
  format: 'yyyy-MM-dd',
}
