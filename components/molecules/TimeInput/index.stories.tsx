import React from 'react'
import { Meta, Story } from '@storybook/react'
import { TimeInput, TimeInputProps } from './index'

const StoryMeta = {
  title: 'molecules/TimeInput',
  component: TimeInput,
} as Meta
export default StoryMeta

const Template: Story<TimeInputProps> = (args) => <TimeInput {...args} />

export const Primary = Template.bind({}) as Story<TimeInputProps>
Primary.args = {
  time: new Date(),
  setTime: () => {},
}
