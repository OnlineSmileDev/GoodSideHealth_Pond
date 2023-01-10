import React from 'react'
import { MultiSelectDropdown, MultiSelectDropdownPropTypes } from './index'
import { Meta, Story } from '@storybook/react'

const StoryMeta = {
  title: 'molecules/MultiSelectDropdown',
  component: MultiSelectDropdown,
} as Meta
export default StoryMeta

const Template: Story<MultiSelectDropdownPropTypes> = (args) => (
  <MultiSelectDropdown {...args} />
)

const options = [
  { id: 1, name: 'test1' },
  { id: 2, name: 'test2' },
  { id: 3, name: 'test3' },
  { id: 4, name: 'test4' },
  { id: 5, name: 'test5' },
  { id: 6, name: 'test6' },
  { id: 7, name: 'test7' },
]

export const Primary = Template.bind({}) as Story

Primary.args = {
  options,
  placeholder: 'Custom Placeholder',
  selectedValues: [],
  setSelectedValues: () => {},
}
