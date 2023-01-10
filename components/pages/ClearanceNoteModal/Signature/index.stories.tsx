import React from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { Provider } from 'react-redux'
import { Meta, Story } from '@storybook/react'
import createStore from 'src/createStore'
import rootReducer from 'src/rootReducer'
import { Signature, SignatureProps } from './index'

const StoryMeta = {
  title: 'pages/ClearanceNoteModal/Signature',
  component: Signature,
  decorators: [
    (Story) => (
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={createStore(rootReducer)}>
          <div style={{ width: '100%', height: '100%' }}>
            <Story />
          </div>
        </Provider>
      </QueryClientProvider>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<SignatureProps> = (args) => <Signature {...args} />

export const Primary = Template.bind({}) as Story<SignatureProps>
Primary.args = {
  currentStep: 2,
  setCurrentStep: (step) => console.log(step),
  formValues: {
    id: 1,
    sessionId: 1,
    stationId: 7,
    stations: [
      {
        id: 1,
        title: 'Registration',
        code: 'registration',
        order_types: [],
        visit_action_name: 'Upload Paperwork',
        station_visits: [],
      },
      {
        id: 2,
        title: 'Height & Weight',
        code: 'height_and_weight',
        visit_action_name: 'Add Results',
        station_visits: [],
      },
      {
        id: 3,
        title: 'Vision',
        code: 'vision',
        order_types: [
          {
            id: 2,
            position: 1,
            form_type_id: null,
          },
        ],
        visit_action_name: 'Add Results',
        station_visits: [],
      },
      {
        id: 4,
        title: 'Musculoskeletal',
        code: 'musculoskeletal',
        order_types: [],
        visit_action_name: 'Add Results',
        station_visits: [],
      },
      {
        id: 6,
        title: 'Medical Assessment',
        code: 'medical_assessment',
        order_types: [],
        visit_action_name: 'Add Results',
        station_visits: [],
      },
      {
        id: 5,
        title: 'Screenings',
        code: 'screenings',
        order_types: [],
        visit_action_name: 'Add Results',
        station_visits: [],
      },
      {
        id: 7,
        title: 'Checkout',
        code: 'checkout',
        order_types: [],
        visit_action_name: 'View Visit',
        station_visits: [],
      },
      {
        id: 8,
        title: 'Complete',
        code: 'complete',
        order_types: [],
        visit_action_name: 'View Visit',
        station_visits: [],
      },
    ],
    providerSignature: 'signature', // not a real signature input/output
    providerFirstName: 'Cody',
    providerLastName: 'Miles',
    providerCredentials: 'MD',
    isProviderCertain: true,
  },
  setFormValues: (values) => console.log(values),
  resetWizard: () => console.log(''),
  isLoading: false,
}
