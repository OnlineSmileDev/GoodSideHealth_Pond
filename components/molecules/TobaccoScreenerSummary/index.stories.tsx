import React from 'react'
import { Meta, Story } from '@storybook/react'
import { ORDER_ITEM_STATUS } from 'constants/orders'
import { TobaccoScreenerSummary, TobaccoScreenerSummaryProps } from './index'

const StoryMeta = {
  title: 'molecules/TobaccoScreenerSummary',
  component: TobaccoScreenerSummary,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<TobaccoScreenerSummaryProps> = (args) => (
  <TobaccoScreenerSummary {...args} />
)

export const Complete = Template.bind({}) as Story<TobaccoScreenerSummaryProps>
Complete.args = {
  completed_at: '2022-01-10T05:17:10.218Z',
  updated_at: '2022-01-10T05:16:07.436Z',
  status: ORDER_ITEM_STATUS.COMPLETE,
  handleOrderAction: (type: string, action: string) =>
    console.log('action', action),
  handleSaveInstructions: (val) => console.log('action', val),
  openEditModal: () => console.log('editOrder'),
}

export const Incomplete = Template.bind(
  {}
) as Story<TobaccoScreenerSummaryProps>
Incomplete.args = {
  completed_at: '2022-01-10T05:17:10.218Z',
  updated_at: '2022-01-10T05:16:07.436Z',
  status: ORDER_ITEM_STATUS.INCOMPLETE,
  handleOrderAction: (type: string, action: string) =>
    console.log('action', action),
}
