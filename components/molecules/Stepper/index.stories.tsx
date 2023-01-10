import React from 'react'
import { Stepper, StepperProps, LABEL_POSITIONS } from './index'
import { Meta, Story } from '@storybook/react'
import './Stepper.css'

const StoryMeta = {
  title: 'molecules/Stepper',
  component: Stepper,
} as Meta
export default StoryMeta

const Template: Story<StepperProps> = (args) => <Stepper {...args} />

const pages = [
  { label: 'label1', component: <div>Component1</div> },
  { label: 'label2', component: <div>Component2</div> },
  { label: 'label3', component: <div>Component3</div> },
  { label: 'label4', component: <div>Component4</div> },
]

export const Primary = Template.bind({}) as Story<StepperProps>
Primary.args = {
  pages,
  activeStep: 1,
  labelPosition: LABEL_POSITIONS.TOP,
}
