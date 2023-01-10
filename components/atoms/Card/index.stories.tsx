import React from 'react'
import { Card } from './index'
import { Meta, Story } from '@storybook/react'

const StoryMeta = {
  title: 'atom/Card',
  component: Card,
} as Meta
export default StoryMeta

const Template: Story = (args) => <Card {...args} />

export const Primary = Template.bind({}) as Story
Primary.args = {
  children: 'This is inside the card',
}
