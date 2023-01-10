import React from 'react'
import { Meta, Story } from '@storybook/react'
import { DiagnosticInput, DiagnosticInputProps } from './index'

const StoryMeta = {
  title: 'molecules/DiagnosticInput',
  component: DiagnosticInput,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<DiagnosticInputProps> = (args) => (
  <DiagnosticInput {...args} />
)

export const Primary = Template.bind({}) as Story<DiagnosticInputProps>
Primary.args = {
  name: 'neck',
  toggleValue: 'normal',
  notesValue: null,
  handleChange: (name, value) => console.log(value),
}

export const Secondary = Template.bind({}) as Story<DiagnosticInputProps>
Secondary.args = {
  name: 'neck',
  toggleValue: 'abnormal',
  notesValue: null,
  handleChange: (name, value) => console.log(value),
}
