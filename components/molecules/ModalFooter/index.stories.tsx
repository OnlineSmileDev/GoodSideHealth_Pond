import React from 'react'
import { ComponentMeta, Story } from '@storybook/react'
import ModalFooter, { ModalFooterProps } from './index'

export default {
  title: 'molecules/ModalFooter',
  component: ModalFooter,
} as ComponentMeta<typeof ModalFooter>

const Template: Story<ModalFooterProps> = (args) => <ModalFooter {...args} />

export const Primary: Story<ModalFooterProps> = Template.bind({})

Primary.args = {
  submitButtonProps: {
    buttonText: 'Save',
  },
  cancelButtonProps: { buttonText: 'Cancel' },
}
