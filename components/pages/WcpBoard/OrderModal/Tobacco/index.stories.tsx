import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Tobacco, TobaccoFormProps } from './index'

const StoryMeta = {
  title: 'pages/WcpBoard/OrderModal/Screeners/Tobacco',
  component: Tobacco,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<TobaccoFormProps> = (args) => <Tobacco {...args} />

export const Primary = Template.bind({}) as Story<TobaccoFormProps>
Primary.args = {
  tobaccoFormValues: {
    tobaccoUser: 'No',
  },
  handleFormAction: (values) => console.log(values),
}
