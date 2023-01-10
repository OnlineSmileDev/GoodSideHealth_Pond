import React from 'react'
import { Meta, Story } from '@storybook/react'
import { VisitDetails, VisitDetailsProps } from './index'

const StoryMeta = {
  title: 'molecules/VisitDetails',
  component: VisitDetails,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<VisitDetailsProps> = (args) => <VisitDetails {...args} />

export const Primary = Template.bind({}) as Story<VisitDetailsProps>
Primary.args = {
  visitDetails: {
    visitDate: '1990-11-11',
    visitLocation: 'Gerogetown High School',
    reasonForVisit: 'Whole Child Physical',
    additionalNotes: '',
    pharmacy: {
      name: 'Walgreens',
      address: '1220 W University Ave Georgetown, TX 78626',
    },
  },
}
