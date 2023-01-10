import React from 'react'
import { VisitStatus, VisitStatusProps, VISIT_STATUS_INDICATOR } from './index'
import { Meta, Story } from '@storybook/react'

const StoryMeta = {
  title: 'molecules/VisitStatus',
  component: VisitStatus,
  decorators: [
    (Story) => (
      <div style={{ width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<VisitStatusProps> = (args) => <VisitStatus {...args} />

export const InProgress = Template.bind({}) as Story<VisitStatusProps>
InProgress.args = {
  status: VISIT_STATUS_INDICATOR.IN_PROGRESS,
}

export const Complete = Template.bind({}) as Story<VisitStatusProps>
Complete.args = {
  status: VISIT_STATUS_INDICATOR.COMPLETE,
}
