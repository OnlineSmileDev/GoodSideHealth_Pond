import React from 'react'
import { Meta, Story } from '@storybook/react'
import { InputControl, InputControlProps } from './index'

const StoryMeta = {
  title: 'molecules/InputControl',
  component: InputControl,
} as Meta
export default StoryMeta

const Template: Story<InputControlProps> = (args) => <InputControl {...args} />

export const Primary = Template.bind({}) as Story
Primary.args = {
  id: 1,
  placeholder: 'Enter Input',
  children: <InputControl as='text'></InputControl>,
  className: 'tw-w-1/2',
}

export const Error = Template.bind({}) as Story
Error.args = {
  id: 1,
  placeholder: 'Enter Input',
  children: <InputControl as='text'></InputControl>,
  errorMessage: 'Invalid Name',
}
