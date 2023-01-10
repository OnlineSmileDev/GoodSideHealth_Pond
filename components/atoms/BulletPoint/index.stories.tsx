import { Meta, Story } from '@storybook/react'
import { BulletPoint, BulletPointProps } from './index'

const StoryMeta = {
  title: 'atom/BulletPoint',
  component: BulletPoint,
} as Meta
export default StoryMeta

const Template: Story<BulletPointProps> = (args) => <BulletPoint {...args} />

export const Primary = Template.bind({}) as Story<BulletPointProps>
Primary.args = {
  size: 'small',
}

export const Medium = Template.bind({}) as Story<BulletPointProps>
Medium.args = {
  size: 'medium',
}

export const Large = Template.bind({}) as Story<BulletPointProps>
Large.args = {
  size: 'large',
}

export const ExclamationPoint = Template.bind({}) as Story<BulletPointProps>
ExclamationPoint.args = {
  color: 'red',
  size: 'large',
  children: '!',
}

export const QuestionMark = Template.bind({}) as Story<BulletPointProps>
QuestionMark.args = {
  color: 'orange',
  size: 'large',
  children: '?',
}

export const Checkmark = Template.bind({}) as Story<BulletPointProps>
Checkmark.args = {
  color: 'green',
  size: 'large',
  children: '✓',
}
