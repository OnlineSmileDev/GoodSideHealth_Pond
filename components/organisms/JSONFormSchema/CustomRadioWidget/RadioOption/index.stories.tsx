import React, { useState } from 'react'
import RadioOption, { RadioOptionProps } from './index'
import { Meta, Story } from '@storybook/react'

const StoryMeta = {
  title: 'organisms/JSONFormSchema/RadioOption',
  component: RadioOption,
} as Meta
export default StoryMeta

const Template: Story<RadioOptionProps> = (args) => {
  const [state, setState] = useState(false)
  const onChange = (val) => {
    setState(val)
    console.log(`${val} clicked`)
  }

  return <RadioOption {...args} onChange={onChange} checked={state} />
}

export const Primary = Template.bind({}) as Story<RadioOptionProps>
Primary.args = {
  value: 'test',
  name: 'test',
  label: 'Radio Option',
  checked: false,
}
