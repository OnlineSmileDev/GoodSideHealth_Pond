import React from 'react'
import { ComponentMeta, Story } from '@storybook/react'
import { StatusCard, StatusCardProps } from './index'

export default {
  title: 'molecules/StatusCard',
  component: StatusCard,
} as ComponentMeta<typeof StatusCard>

const Template = (args) => <StatusCard {...args} />

export const Primary = Template.bind({}) as Story<StatusCardProps>

Primary.args = {
  title: 'Status Card',
  status: 'Complete',
  eventKey: 1,
  unreadIndicator: true,
  children: <div>It&apos;s a children</div>,
  id: 12,
}
