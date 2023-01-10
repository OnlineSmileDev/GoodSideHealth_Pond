import React from 'react'
import { Meta, Story } from '@storybook/react'
import { StepperIcon, StepperIconProps } from './index'

const StoryMeta = {
  title: 'molecules/Stepper/StepperIcon',
  component: StepperIcon,
} as Meta
export default StoryMeta

const Template: Story<StepperIconProps> = (args) => <StepperIcon {...args} />

export const Primary = Template.bind({}) as Story<StepperIconProps>
Primary.args = {
  active: true,
  completed: true,
  icon: 1,
}
