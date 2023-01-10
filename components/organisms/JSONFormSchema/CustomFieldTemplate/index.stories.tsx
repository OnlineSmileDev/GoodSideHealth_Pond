import React from 'react'
import { Meta, Story } from '@storybook/react'
import { FieldTemplateProps } from '@rjsf/core'
import CustomFieldTemplate from './index'

const StoryMeta = {
  title: 'organisms/JSONFormSchema/CustomFieldTemplate',
  component: CustomFieldTemplate,
} as Meta
export default StoryMeta

const Template: Story<FieldTemplateProps> = (args) => (
  <CustomFieldTemplate {...args} />
)

export const SmallSample = Template.bind({}) as Story<FieldTemplateProps>
SmallSample.args = {
  description: <>Sample Description</>,
  children: <>Sample child</>,
}

export const FullSample = Template.bind({}) as Story<FieldTemplateProps>
FullSample.args = {
  classNames: 'font-weight-bold py-1',
  help: <>Sample help text</>,
  description: <>Sample Description</>,
  children: <>Danger Child</>,
}
