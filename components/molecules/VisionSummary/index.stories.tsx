import React from 'react'
import { Meta, Story } from '@storybook/react'
import { ORDER_ITEM_STATUS } from 'constants/orders'
import { VisionSummary, VisionSummaryProps } from './index'

const StoryMeta = {
  title: 'molecules/VisionSummary',
  component: VisionSummary,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<VisionSummaryProps> = (args) => (
  <VisionSummary {...args} />
)

export const Primary = Template.bind({}) as Story<VisionSummaryProps>
Primary.args = {
  visionValues: {
    id: 1,
    vision_left: 20,
    vision_right: 10,
    is_vision_corrected: false,
    updated_at: '2022-01-10T05:16:07.436Z',
  },
  status: ORDER_ITEM_STATUS.COMPLETE,
  openEditModal: () => console.log('action', 'editAssessment'),
  handleSaveInstructions: (val) => console.log('action', val),
}
