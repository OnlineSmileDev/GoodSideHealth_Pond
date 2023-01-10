import React from 'react'
import { Meta, Story } from '@storybook/react'
import FormikNumberInput, { FormikNumberInputProps } from './index'
import { Formik } from 'formik'

const StoryMeta = {
  title: 'atom/FormInputs/FormikNumberInput',
  component: FormikNumberInput,
} as Meta
export default StoryMeta

const Template: Story<FormikNumberInputProps> = (args) => (
  <FormikNumberInput {...args} />
)

export const Primary = Template.bind({}) as Story<FormikNumberInputProps>
Primary.args = {
  name: 'count',
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
