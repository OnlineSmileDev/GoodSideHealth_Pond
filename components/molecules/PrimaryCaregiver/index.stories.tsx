import React from 'react'
import { Meta, Story } from '@storybook/react'
import { PrimaryCaregiver, PrimaryCaregiverProps } from './index'

const StoryMeta = {
  title: 'molecules/PrimaryCaregiver',
  component: PrimaryCaregiver,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<PrimaryCaregiverProps> = (args) => (
  <PrimaryCaregiver {...args} />
)

export const Primary = Template.bind({}) as Story<PrimaryCaregiverProps>
Primary.args = {
  name: 'Cindy Miles',
  relationship: 'Mother',
  phoneNumber: '512-630-5766',
}
