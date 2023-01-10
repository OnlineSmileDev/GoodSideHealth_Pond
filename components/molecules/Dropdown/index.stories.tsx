import React from 'react'
import { ComponentMeta } from '@storybook/react'
import Dropdown from './index'

export default {
  title: 'molecules/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>

const Template = (args) => <Dropdown {...args} />

export const Primary = Template.bind({})

Primary.args = {
  title: 'Dropdown Title',
  items: [
    { label: 'Item 1', value: 1 },
    { label: 'Item 2', value: 2 },
    { label: 'Item 3', value: 3 },
  ],
}
