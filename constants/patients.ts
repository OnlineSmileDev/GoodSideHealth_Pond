export const PATIENT_RACE = [
  'American Indian or Alaska Native',
  'Asian',
  'Black or African American',
  'Bi-Racial / Multiracial',
  'Native Hawaiian or Pacific Islander',
  'White',
  'Other',
]

export const PATIENT_RELATIONS = [
  { title: 'Self', value: 'Self' },
  { title: 'Spouse', value: 'Spouse' },
  { title: 'Father', value: 'Father' },
  { title: 'Mother', value: 'Mother' },
  { title: 'Grandparent', value: 'Grandparent' },
  { title: 'Guardian', value: 'Guardian' },
  { title: 'Stepfather', value: 'Stepfather' },
  { title: 'Stepmother', value: 'Stepmother' },
  { title: 'Other Family Member', value: 'Other Family Member' },
]

export const BIRTH_SEX = [
  { value: 'F', title: 'Female' },
  { value: 'Female', title: 'Female', hidden: true },
  { value: 'M', title: 'Male' },
  { value: 'Male', title: 'Male', hidden: true },
  { value: 'U', title: 'Unspecified' },
  { value: 'Unknown', title: 'Unspecified', hidden: true },
  { value: 'Other', title: 'Unspecified', hidden: true },
]

export const PHONE_TYPES = [
  { title: 'Unspecified', value: 'unspecified' },
  { title: 'Cell Phone', value: 'cell' },
]

export const MAJOR_PATIENT_AGE = 21

export const PATIENT_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
}
