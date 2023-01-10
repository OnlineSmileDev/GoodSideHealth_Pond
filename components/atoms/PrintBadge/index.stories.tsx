import React from 'react'
import { PrintBadge, PRINT_BADGE_VARIANT } from './index'
import { Meta, Story } from '@storybook/react'

const StoryMeta = {
  title: 'atom/PrintBadge',
  component: PrintBadge,
} as Meta
export default StoryMeta

const Template: Story = (args) => <PrintBadge {...args} />

export const Primary = Template.bind({}) as Story
Primary.args = {}

export const Warning = Template.bind({}) as Story
Warning.args = { variant: PRINT_BADGE_VARIANT.WARNING }
