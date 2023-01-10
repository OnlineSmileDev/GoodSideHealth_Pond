import React from 'react'
import moment from 'moment'
import { CustomDatePicker, CustomDatePickerProps } from './index'
import { Meta, Story } from '@storybook/react'
import './DatePicker.css'

const StoryMeta = {
  title: 'atom/DatePicker',
  component: CustomDatePicker,
} as Meta
export default StoryMeta

const Template: Story<CustomDatePickerProps> = (args) => (
  <CustomDatePicker {...args} />
)

export const Primary = Template.bind({}) as Story<CustomDatePickerProps>
Primary.args = {
  date: '1995-08-04',
  onBlur: () => {
    console.log('blurred')
  },
  dateFormat: 'yyyy-MM-dd',
  setDate: () => {},
}

export const WithAllTime = Template.bind({}) as Story<CustomDatePickerProps>
WithAllTime.args = {
  date: '1995-08-04',
  handleAllTimeButtonClick: () => console.log('handleAllTimeButtonClicked'),
  hasAllTimeButton: true,
  onBlur: () => {
    console.log('blurred')
  },
  dateFormat: 'yyyy-MM-dd',
  setDate: () => {},
}

export const FutureDates = Template.bind({}) as Story<CustomDatePickerProps>
FutureDates.args = {
  date: moment(new Date()).format('YYYY-MM-DD'),
  showNoFutureDates: true,
  onBlur: () => {
    console.log('blurred')
  },
  dateFormat: 'yyyy-MM-dd',
  setDate: () => {},
}
