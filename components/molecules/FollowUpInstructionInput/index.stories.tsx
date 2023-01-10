import React from 'react'
import { Meta, Story } from '@storybook/react'
import {
  FollowUpInstructionInput,
  FollowUpInstructionInputProps,
} from './index'

export default {
  title: 'molecules/FollowUpInstructionInput',
  component: FollowUpInstructionInput,
} as Meta

const Template: Story<FollowUpInstructionInputProps> = (args) => (
  <FollowUpInstructionInput {...args} />
)

export const Primary = Template.bind({}) as Story<FollowUpInstructionInputProps>

Primary.args = {
  value: '',
  handleSaveInstructions: (str) => console.log(str),
}
