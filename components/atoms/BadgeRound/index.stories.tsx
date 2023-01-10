import React from 'react'
import { Meta, Story } from '@storybook/react'
import { BadgeRound, BadgeRoundProps, BADGE_VARIANT } from './index'

const StoryMeta = {
  title: 'atom/BadgeRound',
  component: BadgeRound,
} as Meta
export default StoryMeta

const Template: Story<BadgeRoundProps> = (args) => <BadgeRound {...args} />

export const Primary = Template.bind({}) as Story<BadgeRoundProps>
Primary.args = {
  children: '21+',
  variant: BADGE_VARIANT.WARNING,
}
