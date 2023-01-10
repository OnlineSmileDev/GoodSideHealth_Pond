import React from 'react'
import { Meta, Story } from '@storybook/react'
import { CustomSelectInput, CustomSelectInputProps } from './index'

const StoryMeta = {
  title: 'molecules/CustomSelectInput',
  component: CustomSelectInput,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<CustomSelectInputProps> = (args) => (
  <CustomSelectInput {...args} />
)

const options = [
  { id: 1, name: 'test1' },
  { id: 2, name: 'test2' },
  { id: 3, name: 'test3' },
  { id: 4, name: 'test4' },
  { id: 5, name: 'test5' },
  { id: 6, name: 'test6' },
]

export const WithSearchBar = Template.bind({}) as Story<CustomSelectInputProps>
WithSearchBar.args = {
  options,
  placeholder: 'Custom placeholder',
  fieldsToBeDisplayed: ['name'],
  showSearchBar: true,
}

export const WithOutSearchBar = Template.bind(
  {}
) as Story<CustomSelectInputProps>
WithOutSearchBar.args = {
  options,
  placeholder: 'Custom placeholder',
  fieldsToBeDisplayed: ['name'],
  showSearchBar: false,
}
