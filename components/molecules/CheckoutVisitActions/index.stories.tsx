import React from 'react'
import { Meta, Story } from '@storybook/react'
import { CheckoutVisitActions, CheckoutVisitActionsProps } from './index'

const StoryMeta = {
  title: 'molecules/CheckoutVisitActions',
  component: CheckoutVisitActions,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<CheckoutVisitActionsProps> = (args) => (
  <CheckoutVisitActions {...args} />
)

export const Primary = Template.bind({}) as Story<CheckoutVisitActionsProps>
Primary.args = {
  returnToSession: () => console.log('return to session'),
  endVisit: () => console.log('end visit'),
}
