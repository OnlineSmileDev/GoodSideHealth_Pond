import React from 'react'
import { Meta, Story } from '@storybook/react'
import { VisitActivity, VisitActivityProps } from './index'

const StoryMeta = {
  title: 'molecules/VisitActivity',
  component: VisitActivity,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<VisitActivityProps> = (args) => (
  <VisitActivity {...args} />
)

export const Primary = Template.bind({}) as Story<VisitActivityProps>
Primary.args = {
  activities: [
    {
      time: '2:38 PM',
      description: 'Provider Prescribed Tylenol',
    },
    { time: '2:37 PM', description: 'Visit Resumed by Facilitator' },
    { time: '2:36 PM', description: 'Visit Paused by Facilitator' },
    { time: '2:26 PM', description: 'Test Added by Provider' },
    { time: '2:15 PM', description: 'Visit Start' },
  ],
  handleViewAll: (value) => console.log(value),
}
