import React from 'react'
import { Meta, Story } from '@storybook/react'
import { MedicalHistory, MedicalHistoryProps } from './index'

const StoryMeta = {
  title: 'molecules/MedicalHistory',
  component: MedicalHistory,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story = (args: MedicalHistoryProps) => (
  <MedicalHistory {...args} />
)

export const Primary = Template.bind({}) as Story
Primary.args = {
  title: 'Medical History',
}
