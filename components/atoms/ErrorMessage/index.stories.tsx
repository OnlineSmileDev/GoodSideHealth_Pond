import React from 'react'
import { Meta, Story } from '@storybook/react'
import { ErrorMessage, ErrorMessageProps } from './index'

const StoryMeta = {
  title: 'atom/ErrorMessage',
  component: ErrorMessage,
} as Meta
export default StoryMeta

const Template: Story<ErrorMessageProps> = (args) => <ErrorMessage {...args} />

export const Primary = Template.bind({}) as Story<ErrorMessageProps>

Primary.args = {
  errorMessage: 'This is an error message',
}
