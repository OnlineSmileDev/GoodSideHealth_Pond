import React from 'react'
import { Meta, Story } from '@storybook/react'
import { sampleSignature } from 'constants/signature'
import {
  MusculoskeletalForm,
  MusculoskeletalFormProps,
} from './MusculoskeletalForm'

const StoryMeta = {
  title: 'pages/WcpBoard/OrderModal/Musculoskeletal',
  component: MusculoskeletalForm,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<MusculoskeletalFormProps> = (args) => (
  <MusculoskeletalForm {...args} />
)

export const Primary = Template.bind({}) as Story<MusculoskeletalFormProps>
Primary.args = {
  musculoskeletalValues: {
    neck: 'normal',
    neck_notes: null,
    back: 'abnormal',
    back_notes: 'This is abnormal',
    shoulder_or_arm: 'normal',
    shoulder_or_arm_notes: null,
    elbow_or_forearm: 'normal',
    elbow_or_forearm_notes: null,
    wrist_or_hand: 'normal',
    wrist_or_hand_notes: null,
    hip_or_thigh: 'abnormal',
    hip_or_thigh_notes: 'Thigh is in the wrong place',
    knee: 'normal',
    knee_notes: null,
    leg_or_ankle: 'abnormal',
    leg_or_ankle_notes: 'Leg is in the wrong place',
    foot: 'normal',
    foot_notes: null,
    signature: sampleSignature,
  },
  handleFormSubmission: (values) => console.log(values),
}
