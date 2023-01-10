import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Tooltip, TooltipProps } from './index'
import { Button } from 'react-bootstrap'

const StoryMeta = {
  title: 'atom/Tooltip',
  component: Tooltip,
} as Meta
export default StoryMeta

const Template: Story<TooltipProps> = (args) => <Tooltip {...args} />

export const Primary = Template.bind({})

Primary.args = {
  text: 'Download',
  children: (
    <Button variant='outline-dark' size='sm'>
      Tooltip
    </Button>
  ),
}
