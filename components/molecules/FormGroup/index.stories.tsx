import React from 'react'
import { ComponentMeta, Story } from '@storybook/react'
import FormGroup, { FormGroupProps } from './index'
import { Formik } from 'formik'

export default {
  title: 'molecules/FormGroup',
  component: FormGroup,
} as ComponentMeta<typeof FormGroup>

const Template: Story<FormGroupProps> = (args) => <FormGroup {...args} />

export const Primary: Story<FormGroupProps> = Template.bind({})
Primary.args = {
  name: 'email',
  label: 'Email',
}
Primary.decorators = [
  (Story) => (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={(val) => console.log('val :>> ', val)}
    >
      <Story />
    </Formik>
  ),
]

export const Number: Story<FormGroupProps> = Template.bind({})
Number.args = {
  name: 'count',
  label: 'Count',
  type: 'number',
}
Number.decorators = [
  (Story) => (
    <Formik
      initialValues={{ count: 0 }}
      onSubmit={(val) => console.log('val :>> ', val)}
    >
      <Story />
    </Formik>
  ),
]
