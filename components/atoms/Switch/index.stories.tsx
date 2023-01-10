import React from 'react'
import { Meta, Story } from '@storybook/react'
import { SwitchProps, Switch } from './index'

const StoryMeta = {
  title: 'atom/Switch',
  component: Switch,
} as Meta
export default StoryMeta

const Template: Story<SwitchProps> = (args) => <Switch {...args} />
export const Primary = Template.bind({}) as Story<SwitchProps>
Primary.args = {
  checked: true,
  onChange: (e) => {
    console.log(e.target.checked)
  },
  name: 'Switch',
  ariaLabel: 'Switch',
}
