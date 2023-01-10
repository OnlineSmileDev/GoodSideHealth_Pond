export const ORDERS = {
  REGISTRATION: 'registration',
  HEIGHT_AND_WEIGHT: 'height_and_weight',
  MUSCULOSKELETAL: 'musculoskeletal',
  VISION: 'vision',
  MEDICAL_ASSESSMENT: 'medical_assessment',
  SCREENINGS: 'screenings',
  ASSESSMENT_TOBACCO: 'assessment_tobacco',
  PROVIDER_DOCUMENTATION: 'provider_documentation',
  MEDHISTORY: 'registration',
  COVID: 'registration',
}

export const ORDER_TYPES = {
  TEST: 'tests',
  MEDICATION: 'medications',
  ASSESSMENT: 'assessments',
  STANDING_MEDICATION: 'standing medications',
}

export const PROVIDER_ORDER_TYPES = {
  TEST: 'tests',
  MEDICATION: 'medications',
  ASSESSMENT: 'assessments',
}

export const ORDER_STATUS = {
  COMPLETE: 'Complete',
  INCOMPLETE: 'Incomplete',
  DECLINED: 'Declined',
  POSITIVE: 'Positive',
  NEGATIVE: 'Negative',
  PENDING: 'Pending',
}

export const ORDER_ACTIONS = {
  COMPLETE: 'completeOrder',
  EDIT: 'editOrder',
}

export enum ORDER_ITEM_STATUS {
  COMPLETE = 'Complete',
  INCOMPLETE = 'Incomplete',
}
