import React from 'react'
import { Meta, Story } from '@storybook/react'
import { ProviderDocumentation, ProviderDocumentationFormProps } from './index'

const StoryMeta = {
  title: 'pages/WcpBoard/OrderModal/Screeners/Tobacco',
  component: ProviderDocumentation,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<ProviderDocumentationFormProps> = (args) => (
  <ProviderDocumentation {...args} />
)

// ToDo: set up proper mock providerDocumentationFormValues
export const Primary = Template.bind(
  {}
) as Story<ProviderDocumentationFormProps>
Primary.args = {
  providerDocumentationFormValues: {
    // tobaccoUser: 'No',
  },
  handleFormAction: (values) => console.log(values),
}
