import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { Badge, BADGE_OUTLINE_VARIANT } from './index'

export default {
  title: 'atom/Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>

const Template = (args) => <Badge {...args} />

const { OUTLINE_DANGER, OUTLINE_SUCCESS, OUTLINE_WARNING } =
  BADGE_OUTLINE_VARIANT
export const Danger = Template.bind({})
Danger.args = {
  children: 'Danger',
  variant: OUTLINE_DANGER,
}

export const Warning = Template.bind({})
Warning.args = {
  children: 'Warning',
  variant: OUTLINE_WARNING,
}
export const Success = Template.bind({})
Success.args = {
  children: 'Success',
  variant: OUTLINE_SUCCESS,
}
