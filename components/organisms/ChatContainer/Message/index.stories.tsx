import React from 'react'
import moment from 'moment'
import { Meta, Story } from '@storybook/react'
import { Message, MessageProps } from './index'

const StoryMeta = {
  title: 'organisms/ChatContainer/Message',
  component: Message,
} as Meta
export default StoryMeta

const Template: Story<MessageProps> = (args) => <Message {...args} />

export const Primary = Template.bind({}) as Story<MessageProps>
Primary.args = {
  messageDetails: {
    message: 'Hello',
    isSent: true,
    time: moment(),
    _sender: { nickname: 'Provider Paige' },
  },
}
