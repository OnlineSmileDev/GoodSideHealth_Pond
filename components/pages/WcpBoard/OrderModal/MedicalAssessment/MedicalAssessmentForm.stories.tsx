import React from 'react'
import { Meta, Story } from '@storybook/react'
import { sampleSignature } from 'constants/signature'
import {
  MedicalAssessmentForm,
  MedicalAssessmentFormProps,
} from './MedicalAssessmentForm'

const StoryMeta = {
  title: 'pages/WcpBoard/OrderModal/MedicalAssessment',
  component: MedicalAssessmentForm,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<MedicalAssessmentFormProps> = (args) => (
  <MedicalAssessmentForm {...args} />
)

export const Primary = Template.bind({}) as Story<MedicalAssessmentFormProps>
Primary.args = {
  medicalAssessmentValues: {
    appearance: 'normal',
    appearance_notes: null,
    eyes_ears_nose_throat: 'abnormal',
    eyes_ears_nose_throat_notes: 'abnormal',
    lymph_nodes: 'normal',
    lymph_nodes_notes: null,
    heart_auscultation_supine_position: 'normal',
    heart_auscultation_supine_position_notes: null,
    heart_auscultation_standing_position: 'normal',
    heart_auscultation_standing_position_notes: null,
    heart_lower_pulses: 'abnormal',
    heart_lower_pulses_notes: 'abnormal',
    pulses: 'normal',
    pulses_notes: null,
    lungs: 'abnormal',
    lungs_notes: 'abnormal',
    abdomen: 'normal',
    abdomen_notes: null,
    skin: 'normal',
    skin_notes: null,
    marfans_stigmata: 'normal',
    marfans_stigmata_notes: null,
    is_pupils_equal: true,
    signature: sampleSignature,
  },
  forms: [],
  handleFormSubmission: (values) => console.log(values),
}
