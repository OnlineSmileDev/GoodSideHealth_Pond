import React from 'react'
import { ComponentMeta, Story } from '@storybook/react'
import AssessmentResult, { AssessmentResultProps } from './index'
import { Container } from 'react-bootstrap'

export default {
  title: 'atom/AssessmentResult',
  component: AssessmentResult,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} as ComponentMeta<typeof AssessmentResult>

const Template: Story<AssessmentResultProps> = (args) => (
  <AssessmentResult {...args} />
)

export const Default = Template.bind({}) as Story<AssessmentResultProps>
Default.args = {
  question: 'Do you have a question?',
  answer: 'This is the answer',
}

export const Primary = Template.bind({}) as Story<AssessmentResultProps>
Primary.args = {
  question: 'Do you have a question?',
  answer: 'This is the answer',
  bgColorClass: 'bg-primary',
}

export const Danger = Template.bind({}) as Story<AssessmentResultProps>
Danger.args = {
  question: 'Do you have a question?',
  answer: 'This is the answer',
  bgColorClass: 'bg-danger',
}
