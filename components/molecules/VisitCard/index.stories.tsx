import React from 'react'
import { Meta, Story } from '@storybook/react'
import { VisitCard, VisitCardProps } from './index'

const StoryMeta = {
  title: 'molecules/VisitCard',
  component: VisitCard,
} as Meta
export default StoryMeta

const Template: Story<VisitCardProps> = (args) => <VisitCard {...args} />

export const Primary = Template.bind({}) as Story<VisitCardProps>
Primary.args = {
  visit: {
    last_name: 'Johnson',
    first_name: 'Magic',
    patient_id: 'ABCDEF1000',
    date_of_birth: '1980-01-01',
    id: 134322,
    student_id: '12345',
    has_uil_printed: false,
  },
  actionName: 'Complete Order NOW',
  isDownloadingWcpUil: false,
  setDownloadingWcpUilForVisitId: () => {},
  handleAction: (id) => console.log('Handle change for Visit', id),
  handleDownload: () => console.log('Handle download for Visit'),
}
