import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Label, LabelProps } from './index'

const StoryMeta = {
  title: 'atom/Label',
  component: Label,
} as Meta
export default StoryMeta

const Template: Story<LabelProps> = (args) => <Label {...args} />

export const Primary = Template.bind({}) as Story<LabelProps>
Primary.args = {
  children: 'Label',
}
