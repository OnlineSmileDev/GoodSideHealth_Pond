import React from 'react'
import { Meta, Story } from '@storybook/react'
import { SwimLane, SwimLaneProps } from './index'

const StoryMeta = {
  title: 'organisms/SwimLane',
  component: SwimLane,
} as Meta

export default StoryMeta

const Template: Story<SwimLaneProps> = (args) => <SwimLane {...args} />

export const Primary = Template.bind({}) as Story<SwimLaneProps>

Primary.args = {
  station: {
    title: 'Height & Weight',
    code: 'height_and_weight',
    id: 1,
    position: 1,
    station_visits: [
      {
        visit: {
          last_name: 'Johnson',
          first_name: 'Magic',
          date_of_birth: '1980-01-01',
          id: 134322,
          student_id: '12345',
          has_uil_printed: false,
        },
      },
      {
        visit: {
          last_name: 'Harper',
          first_name: 'Alvin',
          date_of_birth: '2020-01-01',
          id: 334322,
          student_id: '32345',
          has_uil_printed: true,
        },
      },
    ],
  },
  handleStationVisitAction: (visitId, stationId) =>
    console.log('handle visit action for', visitId, 'on station', stationId),
}
