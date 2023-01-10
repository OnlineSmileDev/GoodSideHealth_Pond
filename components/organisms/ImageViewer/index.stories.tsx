import React from 'react'
import { ImageViewer, ImageViewerProps } from './index'
import { Meta, Story } from '@storybook/react'

const StoryMeta = {
  title: 'organisms/ImageViewer',
  component: ImageViewer,
} as Meta
export default StoryMeta

const Template: Story<ImageViewerProps> = (args) => <ImageViewer {...args} />

export const Primary = Template.bind({}) as Story

Primary.args = {
  image: {
    show: true,
    url: '',
    name: 'Image Name',
  },
}
