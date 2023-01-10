import React from 'react'
import { Meta, Story } from '@storybook/react'
import { StationSkipper, StationSkipperProps } from './index'

const StoryMeta = {
  title: 'pages/WcpBoard/OrderModal/StationSkipper',
  component: StationSkipper,
  decorators: [
    (Story) => (
      <div style={{ width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<StationSkipperProps> = (args) => (
  <StationSkipper {...args} />
)

export const Primary = Template.bind({}) as Story<StationSkipperProps>
Primary.args = {
  name: 'Abby Nash',
  handleAction: () => console.log('cancel'),
}
