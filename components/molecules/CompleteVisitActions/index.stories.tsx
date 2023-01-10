import React from 'react'
import { Meta, Story } from '@storybook/react'
import { CompleteVisitActions, CompleteVisitActionsProps } from './index'

const StoryMeta = {
  title: 'molecules/CompleteVisitActions',
  component: CompleteVisitActions,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<CompleteVisitActionsProps> = (args) => (
  <CompleteVisitActions {...args} />
)

export const Primary = Template.bind({}) as Story<CompleteVisitActionsProps>
Primary.args = {
  returnToSession: () => console.log('return to session'),
  editClearanceNote: () => console.log('edit clearance note'),
  emailDischargeNote: () => console.log('email discharge note'),
  downloadDischargeNote: () => console.log('download discharge note'),
  isDownloadingDischargeNote: false,
  setIsDownloadingDischargeNote: () => {},
  isDownloadingProviderDoc: false,
  setIsDownloadingProviderDoc: () => {},
  handleMarkVisitPrinted: () => console.log('mark visit printed'),
  isMarkVisitPrintedLoading: false,
}
