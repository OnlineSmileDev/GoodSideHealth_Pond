import React from 'react'
import { Meta, Story } from '@storybook/react'
import { ORDER_ITEM_STATUS } from 'constants/orders'
import { HeightAndWeightSummary, HeightAndWeightSummaryProps } from './index'

const StoryMeta = {
  title: 'molecules/HeightAndWeightSummary',
  component: HeightAndWeightSummary,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<HeightAndWeightSummaryProps> = (args) => (
  <HeightAndWeightSummary {...args} />
)

export const Primary = Template.bind({}) as Story<HeightAndWeightSummaryProps>
Primary.args = {
  heightAndWeightValues: {
    id: 1,
    height_ft: 5,
    height_in: 9,
    weight_lbs: 120,
    pulse_bpm: 160,
    pressure_systolic: 120,
    pressure_diastolic: 160,
    updated_at: '2022-01-10T05:16:07.436Z',
  },
  status: ORDER_ITEM_STATUS.INCOMPLETE,
  openEditModal: () => console.log('action', 'editAssessment'),
  handleSaveInstructions: (val) => console.log('action', val),
}
