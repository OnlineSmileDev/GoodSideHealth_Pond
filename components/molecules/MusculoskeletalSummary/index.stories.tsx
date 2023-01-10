import React from 'react'
import { Meta, Story } from '@storybook/react'
import { ORDER_ITEM_STATUS } from 'constants/orders'
import { MusculoskeletalSummary, MusculoskeletalSummaryProps } from './index'

const StoryMeta = {
  title: 'molecules/MusculoskeletalSummary',
  component: MusculoskeletalSummary,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<MusculoskeletalSummaryProps> = (args) => (
  <MusculoskeletalSummary {...args} />
)

export const Primary = Template.bind({}) as Story<MusculoskeletalSummaryProps>
Primary.args = {
  musculoskeletalValues: {
    id: 1,
    neck: 'normal',
    neck_notes: null,
    back: 'abnormal',
    back_notes: 'This is abnormal',
    shoulder_or_arm: 'normal',
    shoulder_or_arm_notes: null,
    elbow_or_forearm: 'normal',
    elbow_or_forearm_notes: null,
    wrist_or_hand: 'normal',
    wrist_or_hand_notes: null,
    hip_or_thigh: 'abnormal',
    hip_or_thigh_notes: 'Thigh is in the wrong place',
    knee: 'normal',
    knee_notes: null,
    leg_or_ankle: 'abnormal',
    leg_or_ankle_notes: null,
    foot: 'normal',
    foot_notes: null,
    updated_at: '2022-01-10T05:16:07.436Z',
  },

  status: ORDER_ITEM_STATUS.COMPLETE,
  openEditModal: () => console.log('action', 'editAssessment'),
  handleSaveInstructions: (val) => console.log('action', val),
}
