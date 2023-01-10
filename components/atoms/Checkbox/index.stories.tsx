import React from 'react'
import { Meta, Story } from '@storybook/react'
import { CheckboxProps, Checkbox } from './index'

const StoryMeta = {
  title: 'atom/Checkbox',
  component: Checkbox,
} as Meta
export default StoryMeta

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />
export const Primary = Template.bind({}) as Story<CheckboxProps>
Primary.args = {
  checked: true,
  onChange: (e) => {
    console.log(e.target.checked)
  },
  name: 'Checkbox',
  ariaLabel: 'Checkbox',
}
