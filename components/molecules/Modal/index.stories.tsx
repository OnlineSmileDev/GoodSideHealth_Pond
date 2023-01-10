import React from 'react'
import { Modal, ModalProps } from './index'
import { Meta, Story } from '@storybook/react'

const StoryMeta = {
  title: 'molecules/Modal',
  component: Modal,
} as Meta
export default StoryMeta

const Template: Story<ModalProps> = (args) => <Modal {...args} />

export const Primary = Template.bind({}) as Story

Primary.args = {
  title: 'Modal Title',
  onClose: true,
  children: 'Modal detail',
  footer: 'Footer here',
  size: 'sm',
  isHeader: true,
  isFullHeader: true,
  isFullWidth: false,
  isClaimVisitRequestModal: true,
}
