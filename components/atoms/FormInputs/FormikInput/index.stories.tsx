import React from 'react'
import { Meta, Story } from '@storybook/react'
import FormikInput, { FormikInputProps } from './index'
import { Formik } from 'formik'

const StoryMeta = {
  title: 'atom/FormInputs/FormInput',
  component: FormikInput,
} as Meta
export default StoryMeta

const Template: Story<FormikInputProps> = (args) => <FormikInput {...args} />

export const Primary = Template.bind({}) as Story<FormikInputProps>
Primary.args = {
  name: 'email',
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
