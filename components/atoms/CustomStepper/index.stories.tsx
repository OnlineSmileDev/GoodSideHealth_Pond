import React from 'react'
import { Meta, Story } from '@storybook/react'
import { CustomStepper, CustomStepperProps, LABEL_POSITIONS } from './index'

const StoryMeta = {
  title: 'atom/CustomStepper',
  component: CustomStepper,
  decorators: [
    (Story) => (
      <div style={{ width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<CustomStepperProps> = (args) => (
  <CustomStepper {...args} />
)

export const Primary = Template.bind({}) as Story<CustomStepperProps>
Primary.args = {
  steps: [
    { label: 'Step 1', component: <h1>Step 1</h1> },
    { label: 'Step 2', component: <h1>Step 2</h1> },
    { label: 'Step 3', component: <h1>Step 3</h1> },
    { label: 'Step 4', component: <h1>Step 4</h1> },
  ],
  activeStep: 0,
  labelPosition: LABEL_POSITIONS.TOP,
}
