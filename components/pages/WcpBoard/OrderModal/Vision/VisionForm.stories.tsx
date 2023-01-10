import React from 'react'
import { Meta, Story } from '@storybook/react'
import { VisionForm, VisionFormProps } from './VisionForm'

const StoryMeta = {
  title: 'pages/WcpBoard/OrderModal/Vision',
  component: VisionForm,
  decorators: [
    (Story) => (
      <div style={{ width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<VisionFormProps> = (args) => <VisionForm {...args} />

export const Primary = Template.bind({}) as Story<VisionFormProps>
Primary.args = {
  visionFormValues: {
    vision_left: 20,
    vision_right: 10,
    is_vision_corrected: false,
  },
  handleFormSubmission: (values) => {
    console.log(values)
  },
}
