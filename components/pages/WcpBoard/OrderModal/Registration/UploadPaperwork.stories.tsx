import React from 'react'
import { Meta, Story } from '@storybook/react'
import { UploadPaperwork, UploadPaperworkProps } from './UploadPaperwork'

const StoryMeta = {
  title: 'organisms/UploadPaperwork',
  component: UploadPaperwork,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<UploadPaperworkProps> = (args) => (
  <UploadPaperwork {...args} />
)

export const Primary = Template.bind({}) as Story
Primary.args = {}
