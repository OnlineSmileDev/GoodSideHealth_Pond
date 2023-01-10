import React from 'react'
import { Meta, Story } from '@storybook/react'
import {
  HeightAndWeightForm,
  HeightAndWeightFormProps,
} from './HeightAndWeightForm'

const StoryMeta = {
  title: 'pages/WcpBoard/OrderModal/HeightAndWeight',
  component: HeightAndWeightForm,
} as Meta
export default StoryMeta

const Template: Story<HeightAndWeightFormProps> = (args) => (
  <HeightAndWeightForm {...args} />
)

export const Primary = Template.bind({}) as Story
Primary.args = {
  visitValues: {
    date_of_birth: '2012-07-07',
    birth_sex: 'Male',
  },
  heightAndWeightValues: {
    height_ft: 5,
    height_in: 9,
    weight_lbs: 120,
    pulse_bpm: 160,
    pressure_systolic: 120,
    pressure_diastolic: 160,
    date_of_birth: '2012-07-07',
    birth_sex: 'Male',
  },
  handleFormSubmission: (values) => {
    console.log(values)
  },
}

export const Disabled = Template.bind({}) as Story
Disabled.args = {
  heightAndWeightValues: {
    height_ft: null,
    height_in: null,
    weight_lbs: null,
    pulse_bpm: null,
    pressure_systolic: null,
    pressure_diastolic: null,
  },
  handleFormSubmission: (values) => {
    console.log(values)
  },
}
