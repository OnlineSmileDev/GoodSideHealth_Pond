import React from 'react'
import { Pagination, PaginationProps } from './index'
import { Meta, Story } from '@storybook/react'
import './Pagination.css'

const StoryMeta = {
  title: 'molecules/Pagination',
  component: Pagination,
} as Meta
export default StoryMeta

const Template: Story<PaginationProps> = (args) => <Pagination {...args} />

export const Primary = Template.bind({}) as Story<PaginationProps>
Primary.args = {
  recordsPerPage: 10,
  totalSize: 100,
  currentPage: 1,
  ellipses: 2,
  paginate: (value) => console.log(value),
}
