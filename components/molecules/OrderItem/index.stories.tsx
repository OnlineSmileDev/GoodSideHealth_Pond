import React from 'react'
import { Meta, Story } from '@storybook/react'
import { OrderItem, OrderItemProps, ORDER_ITEM_VARIANT } from './index'

const StoryMeta = {
  title: 'molecules/OrderItem',
  component: OrderItem,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<OrderItemProps> = (args) => <OrderItem {...args} />

export const Primary = Template.bind({}) as Story<OrderItemProps>
Primary.args = {
  label: 'Foot',
  value: 'normal',
  variant: ORDER_ITEM_VARIANT.LIGHT,
  dataTestId: 'foot',
}

export const Secondary = Template.bind({}) as Story<OrderItemProps>
Secondary.args = {
  label: 'Foot',
  value: 'abnormal',
  variant: ORDER_ITEM_VARIANT.WHITE,
  showIndicator: true,
  dataTestId: 'foot',
}
