import React from 'react'
import { Meta, Story } from '@storybook/react'
import { ScreenerPhqForm, PhqFormProps } from './index'

const StoryMeta = {
  title: 'pages/WcpBoard/OrderModal/Screeners/ScreenerPhq',
  component: ScreenerPhqForm,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<PhqFormProps> = (args) => <ScreenerPhqForm {...args} />

export const Primary = Template.bind({}) as Story<PhqFormProps>
Primary.args = {
  phqFormValues: {
    PH2: {
      PH8: {},
      interest: undefined,
      depression: undefined,
    },
  },
  handleFormAction: (values) => console.log(values),
}
