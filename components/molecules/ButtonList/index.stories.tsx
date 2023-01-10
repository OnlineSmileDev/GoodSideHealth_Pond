import React from 'react'
import { Meta, Story } from '@storybook/react'
import { BUTTON_VARIANT } from 'components/atoms/Button'
import { ButtonList, ButtonListProps } from './index'

const StoryMeta = {
  title: 'molecules/ButtonList',
  component: ButtonList,
} as Meta
export default StoryMeta

const Template: Story<ButtonListProps> = (args) => <ButtonList {...args} />

export const Primary = Template.bind({})

const { WARNING, SUCCESS, DANGER } = BUTTON_VARIANT
Primary.args = {
  list: [
    {
      variant: WARNING,
      clickHandler: () => console.log('Button 1 clicked'),
      buttonText: 'Button 1',
      dataTest: 'button1',
      style: 'tw-mx-4',
    },
    {
      variant: SUCCESS,
      clickHandler: () => console.log('Button 2 clicked'),
      buttonText: 'Button 2',
      dataTest: 'button2',
      style: 'tw-mx-4',
    },
    {
      variant: DANGER,
      clickHandler: () => console.log('Button 3 clicked'),
      buttonText: 'Button 3',
      dataTest: 'button3',
      style: 'tw-mx-4',
    },
  ],
}
