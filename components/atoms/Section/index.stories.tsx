import React from 'react'
import { Section, SectionProps } from './index'
import { Meta, Story } from '@storybook/react'

const StoryMeta = {
  title: 'atom/Section',
  component: Section,
} as Meta
export default StoryMeta

const Template: Story<SectionProps> = (args) => <Section {...args} />

export const Primary = Template.bind({}) as Story<SectionProps>
Primary.args = {
  title: 'Section Title',
  meta: 'Completed',
  horizontalRule: true,
  children: 'description about the section title',
}
