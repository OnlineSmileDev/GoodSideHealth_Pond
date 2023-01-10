import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Footer } from './index'

const StoryMeta = {
  title: 'atom/Footer',
  component: Footer,
} as Meta
export default StoryMeta

const Template: Story = () => <Footer />

export const Primary = Template.bind({}) as Story
