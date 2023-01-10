import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Modal, ModalProps, MODAL_SIZE, CONTAINER_WIDTH } from './index'

const StoryMeta = {
  title: 'organisms/Modal',
  component: Modal,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<ModalProps> = (args) => <Modal {...args} />

export const Primary = Template.bind({}) as Story
Primary.args = {
  title: 'Bruce Wayne',
  subtitle: 'Vision',
  size: MODAL_SIZE.FULL,
  onClose: () => null,
  isOpen: true,
  contentContainerSize: CONTAINER_WIDTH.MD,
  children: (
    <div>
      <div className='tw-font-hind tw-font-bold tw-text-22'>Zyianna Abbas</div>
      <div
        id='visualEquity'
        className='tw-my-2 tw-grid md:tw-grid-cols-3 md:tw-gap-6 tw-items-center'
      >
        <label className='tw-font-bold tw-leading-6 tw-text-sm tw-font-hind'>
          Vision
        </label>
        <div className='tw-col-span-2 tw-flex tw-items-center tw-ml-2.5'>
          <div className='tw-font-hind tw-text-center tw-align-middle tw-mr-1.5 tw-text-sm'>
            R 20/
          </div>
          <div className='tw-w-10 tw-mr-2.5'>
            <input
              className='tw-block tw-h-10 tw-w-full tw-border tw-rounded tw-px-3 tw-py-1.5 tw-text-xs tw-text-black tw-font-bold tw-border-pondBlack-lighter tw-text-center tw-font-hind'
              name='vision_right'
              maxLength={3}
              type='text'
              value='15'
              inputMode='numeric'
              readOnly
            />
          </div>
          <div className='tw-font-hind tw-text-center tw-align-middle tw-mr-1.5 tw-text-sm'>
            L 20/
          </div>
          <div className='tw-w-10 tw-mr-2.5'>
            <input
              className='tw-block tw-h-10 tw-w-full tw-border tw-rounded tw-px-3 tw-py-1.5 tw-text-xs tw-text-black tw-font-bold tw-border-pondBlack-lighter tw-text-center tw-font-hind'
              name='vision_left'
              maxLength={3}
              type='text'
              value='20'
              inputMode='numeric'
              readOnly
            />
          </div>
        </div>
      </div>
      <div
        id='glassesOrContacts'
        className='tw-my-2 tw-grid md:tw-grid-cols-3 md:tw-gap-6 tw-item-center'
      >
        <label className='tw-font-bold tw-leading-6 tw-text-sm tw-font-hind'>
          Glasses or Contacts?
        </label>
        <div className='tw-flex tw-flex-row tw-items-center tw-col-span-2'>
          <div className='tw-rounded-xl tw-p-px tw-w-12.25 tw-h-5 tw-bg-opacity-50 tw-m-2 tw-cursor-pointer tw-bg-danger-darker'>
            <input
              type='checkbox'
              className='tw-hidden'
              name='is_vision_corrected'
            />
            <span className='tw-rounded-full tw-w-5 tw-h-5 tw-transform tw-mx-auto tw-duration-200 tw-ease-in-out tw-block tw--mt-px tw--translate-x-3.5 tw-bg-danger-darker'></span>
          </div>
          <span className='tw-font-hind tw-text-sm tw-mt-1'>No</span>
        </div>
      </div>
      <div className='tw-flex tw-justify-end tw-w-full tw-mt-10 tw-mb-5'>
        <button
          data-testid='submit-button'
          className='tw-font-bold tw-font-hind tw-h-10 tw-rounded tw-bg-primary hover:tw-bg-primary-lighter tw-text-white tw-w-200  tw-mx-1.5 tw-text-sm'
        >
          Submit
        </button>
      </div>
    </div>
  ),
}
