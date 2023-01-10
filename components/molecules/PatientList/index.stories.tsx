import React from 'react'
import { Meta, Story } from '@storybook/react'
import { PatientList, PatientListProps } from './index'

const StoryMeta = {
  title: 'molecules/PatientList',
  component: PatientList,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<PatientListProps> = (args) => <PatientList {...args} />

export const Primary = Template.bind({}) as Story<PatientListProps>
Primary.args = {
  patients: [
    {
      id: 'AGUYOL1006',
      firstName: 'Yolien',
      lastName: 'Aguirre',
      dateOfBirth: '1983-12-06',
      status: 'completed',
    },
    {
      id: 'ALVWIL1029',
      firstName: 'Willa',
      lastName: 'alvarado',
      dateOfBirth: '1983-12-12',
      status: 'inCompleted',
    },
    {
      id: 'ALVWIL1036',
      firstName: 'Wila',
      lastName: 'Alvarado',
      dateOfBirth: '1983-12-02',
      status: 'completed',
    },
    {
      id: 'ALVWIL1037',
      firstName: 'Wila',
      lastName: 'Alvarado',
      dateOfBirth: '1984-08-03',
      status: 'completed',
    },
  ],
}
