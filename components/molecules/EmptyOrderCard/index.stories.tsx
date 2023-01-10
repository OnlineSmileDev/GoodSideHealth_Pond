import React from 'react'
import { EmptyOrderCard } from './index'
import { Meta, Story } from '@storybook/react'

const StoryMeta = {
  title: 'molecules/EmptyOrderCard',
  component: EmptyOrderCard,
} as Meta
export default StoryMeta

const Template: Story = (args) => <EmptyOrderCard {...args} />

export const Primary = Template.bind({}) as Story
Primary.args = {}
