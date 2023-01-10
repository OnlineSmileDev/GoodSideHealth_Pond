import React from 'react'
import { StationsIndicator, StationsIndicatorProps } from './index'
import { STATIONS } from 'constants/kanbanBoard'
import { Meta, Story } from '@storybook/react'

const StoryMeta = {
  title: 'molecules/StationsIndicator',
  component: StationsIndicator,
} as Meta
export default StoryMeta

const Template: Story<StationsIndicatorProps> = (args) => (
  <StationsIndicator {...args} />
)

export const Primary = Template.bind({}) as Story<StationsIndicatorProps>

Primary.args = {
  stations: STATIONS,
  visit: {
    id: 1,
    first_name: 'Hettie',
    last_name: 'Welch',
    date_of_birth: '2021-04-07T18:30:00.000Z',
    has_uil_printed: false,
  },
}
