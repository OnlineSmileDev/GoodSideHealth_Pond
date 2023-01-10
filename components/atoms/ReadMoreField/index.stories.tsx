import React from 'react'
import { Meta, Story } from '@storybook/react'
import { ReadMoreField, ReadMoreFieldProps } from './index'

const StoryMeta = {
  title: 'atom/ReadMoreField',
  component: ReadMoreField,
} as Meta
export default StoryMeta

const Template: Story<ReadMoreFieldProps> = (args) => (
  <ReadMoreField {...args} />
)

export const Primary = Template.bind({}) as Story<ReadMoreFieldProps>
Primary.args = {
  fieldName: 'ReadMoreField',
  fieldData: 'This is a ReadMoreField component',
  readMore: {},
  setReadMore: () => {},
}
