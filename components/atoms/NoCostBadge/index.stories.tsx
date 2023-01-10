import React from 'react'
import { NoCostBadge } from './index'
import { Meta, Story } from '@storybook/react'

const StoryMeta = {
  title: 'atom/NoCostBadge',
  component: NoCostBadge,
} as Meta
export default StoryMeta

const Template: Story = (args) => <NoCostBadge {...args} />

export const Primary = Template.bind({}) as Story
Primary.args = {}
