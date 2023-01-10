import React, { MouseEvent } from 'react'
import { Meta, Story } from '@storybook/react'
import { Button, ButtonProps, BUTTON_VARIANT } from './index'

const StoryMeta = {
  title: 'atom/Button',
  component: Button,
} as Meta
export default StoryMeta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

const { PRIMARY, DANGER, WARNING, SUCCESS } = BUTTON_VARIANT

export const Primary = Template.bind({}) as Story<ButtonProps>
Primary.args = {
  children: 'Primary',
  variant: PRIMARY,
  onClick: (e: MouseEvent<HTMLButtonElement>) => console.log('click', e),
}

export const Danger = Template.bind({}) as Story<ButtonProps>
Danger.args = {
  children: 'Danger',
  variant: DANGER,
  onClick: (e: MouseEvent<HTMLButtonElement>) => console.log('click', e),
}

export const Warning = Template.bind({}) as Story<ButtonProps>
Warning.args = {
  children: 'Warning',
  variant: WARNING,
  onClick: (e: MouseEvent<HTMLButtonElement>) => console.log('click', e),
}

export const Success = Template.bind({}) as Story<ButtonProps>
Success.args = {
  children: 'Success',
  variant: SUCCESS,
  onClick: (e: MouseEvent<HTMLButtonElement>) => console.log('click', e),
}

export const Disabled = Template.bind({}) as Story<ButtonProps>
Disabled.args = {
  children: 'Disabled',
  variant: PRIMARY,
  disabled: true,
  onClick: (e: MouseEvent<HTMLButtonElement>) => console.log('click', e),
}

export const Loading = Template.bind({}) as Story<ButtonProps>
Loading.args = {
  children: 'Loading...',
  variant: PRIMARY,
  isLoading: true,
  onClick: (e: MouseEvent<HTMLButtonElement>) => console.log('click', e),
}
