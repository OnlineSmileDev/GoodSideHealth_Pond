import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Table, TableProps, SortingCustomIcon } from './index'
import './Table.css'

const StoryMeta = {
  title: 'atom/Table',
  component: Table,
} as Meta
export default StoryMeta

const Template: Story<TableProps> = (args) => <Table {...args} />

const columnName = [
  {
    dataField: 'id',
    text: 'Product ID',
    sort: true,
    sortCaret: SortingCustomIcon,
    formatExtraData: 'isDarkCaret',
  },
  {
    dataField: 'name',
    text: 'Product Name',
    sort: true,
    sortCaret: SortingCustomIcon,
    formatExtraData: 'isDarkCaret',
  },
  {
    dataField: 'price',
    text: 'Product Price',
    sort: true,
    sortCaret: SortingCustomIcon,
    formatExtraData: 'isDarkCaret',
  },
]
const products = [
  {
    id: '1',
    name: 'product1',
    price: '100',
  },
  { id: '2', name: 'product2', price: '200' },
  { id: '3', name: 'product3', price: '300' },
]

export const Primary = Template.bind({}) as Story<TableProps>
Primary.args = {
  bootstrap4: false,
  keyField: 'id',
  columns: columnName,
  data: products,
  isLightBg: true,
  isRightAlign: false,
  isLightFont: false,
  isLessHeaderHeight: false,
  noVerticalSpace: false,
}
