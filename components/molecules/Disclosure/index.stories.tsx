import React from 'react'
import Disclosure, {
  DisclosureBodyProps,
  DisclosureProps,
  DISCLOSURE_VARIANT,
} from './index'
import { Meta, Story } from '@storybook/react'

const StoryMeta = {
  title: 'molecules/Disclosure',
  component: Disclosure,
} as Meta
export default StoryMeta

const Template: Story<DisclosureProps & DisclosureBodyProps> = (args) => (
  <Disclosure>
    <Disclosure.Body {...args} />
  </Disclosure>
)

export const Primary = Template.bind({}) as Story<
  DisclosureProps & DisclosureBodyProps
>
Primary.args = {
  eventKey: '1',
  variant: DISCLOSURE_VARIANT.SUCCESS,
  header: (
    <>
      <div>This is Disclosure Header</div>
    </>
  ),
  activeKey: {},
  setActiveKey: () => {},
  children: (
    <>
      <div>This is Disclosure Collapse</div>
    </>
  ),
}
