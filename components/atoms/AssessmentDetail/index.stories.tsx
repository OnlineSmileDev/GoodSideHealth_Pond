import React from 'react'
import { ComponentMeta, Story } from '@storybook/react'
import { Row } from 'react-bootstrap'
import AssessmentDetail, { AssessmentDetailProps } from './index'

export default {
  title: 'atom/AssessmentDetail',
  component: AssessmentDetail,
  decorators: [
    (Story) => (
      <Row>
        <Story />
      </Row>
    ),
  ],
} as ComponentMeta<typeof AssessmentDetail>

const Template: Story<AssessmentDetailProps> = (args) => (
  <AssessmentDetail {...args} />
)

export const Primary = Template.bind({}) as Story<AssessmentDetailProps>
Primary.args = {
  name: 'Key',
  value: 'Value',
}

export const Multiple = () => (
  <>
    <Template name='Key 1' value='Value 1' />
    <Template name='Key 2' value='Value 2' />
    <Template name='Key 3' value='Value 3' />
    <Template name='Key 4' value='Value 4' />
  </>
)
