import React from 'react'
import { Meta, Story } from '@storybook/react'
import { InputControl } from 'components/molecules/InputControl'
import { InputGroup, InputGroupProps } from './index'

const StoryMeta = {
  title: 'molecules/InputGroup',
  component: InputGroup,
} as Meta
export default StoryMeta

const Template: Story<InputGroupProps> = (args) => <InputGroup {...args} />

export const Primary = Template.bind({}) as Story
Primary.args = {
  id: 1,
  label: 'Label',
  children: <InputControl type='text'></InputControl>,
}
