import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Complete, CompleteProps } from './index'

const StoryMeta = {
  title: 'pages/WcpBoard/OrderModal/Screeners/Complete',
  component: Complete,
} as Meta
export default StoryMeta

const Template: Story<CompleteProps> = (args) => <Complete {...args} />

export const Primary = Template.bind({}) as Story<CompleteProps>
Primary.args = {
  reset: () => console.log('handleClose'),
}
