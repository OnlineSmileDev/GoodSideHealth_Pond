import React from 'react'
import { Meta, Story } from '@storybook/react'
import { ORDER_ITEM_STATUS } from 'constants/orders'
import {
  MedicalAssessmentSummary,
  MedicalAssessmentSummaryProps,
} from './index'

const StoryMeta = {
  title: 'molecules/MedicalAssessmentSummary',
  component: MedicalAssessmentSummary,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<MedicalAssessmentSummaryProps> = (args) => (
  <MedicalAssessmentSummary {...args} />
)

export const Primary = Template.bind({}) as Story<MedicalAssessmentSummaryProps>
Primary.args = {
  medicalAssessmentValues: {
    id: 1,
    appearance: 'normal',
    appearance_notes: null,
    eyes_ears_nose_throat: 'abnormal',
    eyes_ears_nose_throat_notes: 'this is abnormal',
    lymph_nodes: 'normal',
    lymph_nodes_notes: null,
    heart_auscultation_supine_position: 'abnormal',
    heart_auscultation_supine_position_notes:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed urna diam. Maecenas euismod sagittis magna id malesuada. Etiam tincidunt augue lorem.',
    heart_auscultation_standing_position: 'normal',
    heart_auscultation_standing_position_notes: null,
    heart_lower_pulses: 'normal',
    heart_lower_pulses_notes: null,
    pulses: 'normal',
    pulses_notes: null,
    lungs: 'normal',
    lungs_notes: null,
    abdomen: 'abnormal',
    abdomen_notes: null,
    skin: 'normal',
    skin_notes: null,
    marfans_stigmata: 'normal',
    marfans_stigmata_notes: null,
    updated_at: '2022-01-10T05:16:07.436Z',
  },
  status: ORDER_ITEM_STATUS.INCOMPLETE,
  openEditModal: () => console.log('action', 'editAssessment'),
  handleSaveInstructions: (val) => console.log('action', val),
}
