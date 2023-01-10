import React from 'react'
import { Meta, Story } from '@storybook/react'
import { SHARE_METHOD } from 'constants/invitations'
import { ShareRegistrationLink, ShareRegLinkProps } from './index'

const StoryMeta = {
  title: 'molecules/ShareRegistrationLink',
  component: ShareRegistrationLink,
  decorators: [
    (Story) => (
      <div className='tw-w-full tw-h-full'>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<ShareRegLinkProps> = (args) => (
  <ShareRegistrationLink {...args} />
)

const dummyDistrictOptions = [
  { value: 'district1', name: 'District 1' },
  { value: 'district2', name: 'District 2' },
  { value: 'district3', name: 'District 3' },
  { value: 'district4', name: 'District 4' },
  { value: 'district5', name: 'District 5' },
]

export const Primary = Template.bind({}) as Story<ShareRegLinkProps>
Primary.args = {
  formValues: {
    recipientName: 'Dummy User',
    shareMethod: SHARE_METHOD.SMS,
    district: 'district2',
    phoneNumber: '9999955555',
    emailAddress: '',
  },
  setFormValues: (values) => console.log(values),
  reset: () => {},
  districtOptions: dummyDistrictOptions,
}
