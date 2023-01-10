import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Value, ValueProps } from './index'

const StoryMeta = {
  title: 'atom/Value',
  component: Value,
} as Meta
export default StoryMeta

const Template: Story<ValueProps> = (args) => <Value {...args} />

export const Primary = Template.bind({}) as Story<ValueProps>
Primary.args = {
  children: 'Value',
}
