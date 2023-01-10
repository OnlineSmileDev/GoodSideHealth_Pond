import React from 'react'
import Banner, { BannerProps } from './index'
import { Meta, Story } from '@storybook/react'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import IMAGES from '../../../src/assets/images'

const StoryMeta = {
  title: 'molecules/Banner',
  component: Banner,
} as Meta
export default StoryMeta

const Template: Story<BannerProps> = (args) => <Banner {...args} />

export const Primary = Template.bind({}) as Story<BannerProps>
Primary.args = {
  title: 'Sample Title',
  image: IMAGES.DuckWithWave,
  imageProps: {
    alt: 'Goodside Health Duck',
    width: 105,
  },
  children: (
    <>
      <p className='mb-0'>This is a banner</p>
      <Button className='tw-mt-3' variant={BUTTON_VARIANT.PRIMARY}>
        Click Me
      </Button>
    </>
  ),
}

export const Disclaimer = Template.bind({}) as Story<BannerProps>
Disclaimer.args = {
  title: 'Sample Title',
  text: 'This is a simple banner/disclaimer',
}
