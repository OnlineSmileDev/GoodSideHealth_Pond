import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Notification, NotificationProps, NOTIFICATION_VARIANT } from './index'

const StoryMeta = {
  title: 'atom/Notification',
  component: Notification,
} as Meta
export default StoryMeta

const Template: Story<NotificationProps> = (args) => <Notification {...args} />

const { SUCCESS, DANGER, WARNING } = NOTIFICATION_VARIANT
export const Primary = Template.bind({}) as Story<NotificationProps>
Primary.args = {
  message: 'Success Notification',
  variant: SUCCESS,
}

export const Danger = Template.bind({}) as Story<NotificationProps>
Danger.args = {
  message: 'Danger Notification',
  variant: DANGER,
}
export const Warning = Template.bind({}) as Story<NotificationProps>
Warning.args = {
  message: 'Warning Notification',
  variant: WARNING,
}
