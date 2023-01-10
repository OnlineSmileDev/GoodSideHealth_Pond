import React from 'react'
import { Meta, Story } from '@storybook/react'
import { SubHeader, SubHeaderProps } from './index'

const StoryMeta = {
  title: 'organisms/SubHeader',
  component: SubHeader,
} as Meta
export default StoryMeta

const Template: Story<SubHeaderProps> = (args) => <SubHeader {...args} />

export const Primary = Template.bind({}) as Story<SubHeaderProps>
Primary.args = {
  title: 'Group 1',
  description: 'Whole Child Phyical Visit',
}
