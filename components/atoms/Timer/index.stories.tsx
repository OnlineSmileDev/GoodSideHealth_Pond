import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Timer, TimerProps } from './index'

const StoryMeta = {
  title: 'atom/Timer',
  component: Timer,
} as Meta
export default StoryMeta

const Template: Story<TimerProps> = (args) => <Timer {...args} />
export const Primary = Template.bind({}) as Story<TimerProps>
Primary.args = {
  initialTime: '',
}
