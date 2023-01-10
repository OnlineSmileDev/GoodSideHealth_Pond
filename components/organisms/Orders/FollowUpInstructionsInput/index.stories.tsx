import React from 'react'
import { FollowUpInstructionsInput, FollowUpInstructionsProps } from './index'
import { Meta, Story } from '@storybook/react'

const StoryMeta = {
  title: 'organisms/Orders/FollowUpInstructionsInput',
  component: FollowUpInstructionsInput,
} as Meta
export default StoryMeta

const Template: Story<FollowUpInstructionsProps> = (args) => (
  <FollowUpInstructionsInput {...args} />
)

export const Primary = Template.bind({}) as Story
Primary.args = {
  followUpInstructions: 'Follow up instruction Input',
  orderType: 'Test',
  id: '1',
  isProvider: true,
  isVisitActive: true,
  saveFollowUpInstructions: () => console.log('Follow-Up Instruction Saved'),
}
