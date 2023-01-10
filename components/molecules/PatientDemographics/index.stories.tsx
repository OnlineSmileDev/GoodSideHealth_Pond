import React from 'react'
import { Meta, Story } from '@storybook/react'
import { PatientDemographics, PatientDemographicsProps } from './index'

const StoryMeta = {
  title: 'molecules/PatientDemographics',
  component: PatientDemographics,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta
export default StoryMeta

const Template: Story<PatientDemographicsProps> = (args) => (
  <PatientDemographics {...args} />
)

export const Primary = Template.bind({}) as Story<PatientDemographicsProps>
Primary.args = {
  name: 'Cody Miles',
  dateOfBirth: '1990-11-11',
  allergies: 'Patient has peanut allergies and 52 tree and grasses allergies.',
  primaryLanguage: 'English',
  knownMedications:
    'Methylphenidate - 20mg twice a day Amandatine - 100mg twice a day.',
  knownConditions: '',
}

export const WithAgeLessThan21 = Template.bind(
  {}
) as Story<PatientDemographicsProps>
WithAgeLessThan21.args = {
  dateOfBirth: '2000-11-11',
  allergies: 'Patient has peanut allergies and 52 tree and grasses allergies.',
  primaryLanguage: 'English',
  knownMedications:
    'Methylphenidate - 20mg twice a day Amandatine - 100mg twice a day.',
  knownConditions: '',
}
