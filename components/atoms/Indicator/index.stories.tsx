import React from 'react'
import { Indicator, IndicatorProps, INDICATOR_VARIANT } from './index'
import { Meta, Story } from '@storybook/react'

const StoryMeta = {
  title: 'atom/Indicator',
  component: Indicator,
} as Meta
export default StoryMeta

const Template: Story = (args) => <Indicator {...args} />

const { PRIMARY, SUCCESS, WARNING } = INDICATOR_VARIANT
export const Primary = Template.bind({}) as Story<IndicatorProps>
Primary.args = {
  variant: PRIMARY,
  children: 'Primary',
}

export const Success = Template.bind({}) as Story<IndicatorProps>
Success.args = {
  variant: SUCCESS,
  children: 'Success',
}

export const Warning = Template.bind({}) as Story<IndicatorProps>
Warning.args = {
  variant: WARNING,
  children: 'Warning',
}
