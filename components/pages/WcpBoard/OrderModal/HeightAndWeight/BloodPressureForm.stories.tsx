import React from 'react'
import { Meta, Story } from '@storybook/react'
import { BloodPressureForm, BloodPressureFormProps } from './BloodPressureForm'

const StoryMeta = {
  title: 'pages/WcpBoard/OrderModal/BloodPressureForm',
  component: BloodPressureForm,
} as Meta
export default StoryMeta

const Template: Story<BloodPressureFormProps> = (args) => (
  <BloodPressureForm {...args} />
)

export const Primary = Template.bind({}) as Story
Primary.args = {
  value: {
    pressure_systolic: 120,
    pressure_diastolic: 160,
  },
  onValueChange: (value) => {
    console.log(value)
  },
}

export const Disabled = Template.bind({}) as Story
Disabled.args = {
  value: {
    pressure_systolic: null,
    pressure_diastolic: null,
  },
  disabled: true,
}
