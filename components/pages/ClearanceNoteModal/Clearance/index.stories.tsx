import React from 'react'
import { Meta, Story } from '@storybook/react'
import { NOTIFICATION_VARIANT } from 'components/atoms/Notification'
import { CLEARANCE_STATUS } from 'constants/kanbanBoard'
import { Clearance, ClearanceProps } from './index'

const StoryMeta = {
  title: 'pages/ClearanceNoteModal/Clearance',
  component: Clearance,
  decorators: [
    (Story) => (
      <div className='tw-w-full tw-h-full'>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<ClearanceProps> = (args) => <Clearance {...args} />

const notifications = [
  { variant: NOTIFICATION_VARIANT.WARNING, message: 'Dummy message' },
]

export const Primary = Template.bind({}) as Story<ClearanceProps>
Primary.args = {
  currentStep: 1,
  setCurrentStep: () => console.log('step setter'),
  formValues: {
    selectedClearance: CLEARANCE_STATUS.CLEARED,
    preClearanceEvaluation: '',
    notClearedDetails: '',
    notClearedReason: '',
    recommendation: '',
  },
  setFormValues: (values) => console.log(values),
  resetWizard: () => console.log(''),
  notifications: notifications,
}
