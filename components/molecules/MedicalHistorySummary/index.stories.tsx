import React from 'react'
import { Meta, Story } from '@storybook/react'
import { MedicalHistorySummary, MedicalHistorySummaryProps } from './index'

const StoryMeta = {
  title: 'molecules/MedicalHistory',
  component: MedicalHistorySummary,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story = (args: MedicalHistorySummaryProps) => (
  <MedicalHistorySummary {...args} />
)

export const Primary = Template.bind({}) as Story
Primary.args = {
  title: 'Medical History',
}
