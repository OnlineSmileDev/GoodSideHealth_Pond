export const VISITS_STATUS = {
  COMPLETED: 'Completed',
  VISIT_COMPLETED: 'Visit Completed',
  IN_PROGRESS: 'In Progress',
  WAITING: 'Waiting',
  WAITING_FOR_RESULT: 'Waiting for Result',
  TEST_DENIED: 'Test Denied',
  CANCELLED: 'Cancelled',
  ENDED: 'Ended',
  ABSENT: 'Absent',
  ACTION_REQUIRED: 'Action Required',
  PENDING: 'Pending',
  NEW: 'New',
  VISIT_ENDED: 'Visit Ended',
}

export const VISIT_TYPE = {
  ON_DEMAND: 'on_demand',
  WCP: 'wcp',
}

export const PROVIDER_VISIT_TYPE = {
  ON_DEMAND_VISITS: 'On-Demand Visits',
  SCHEDULED_VISITS: 'Scheduled Visits',
}

export const VISIT_STATUS_OPTIONS = [
  VISITS_STATUS.IN_PROGRESS,
  VISITS_STATUS.WAITING,
  VISITS_STATUS.PENDING,
  VISITS_STATUS.ACTION_REQUIRED,
  VISITS_STATUS.VISIT_ENDED,
  VISITS_STATUS.COMPLETED,
]

export const VISIT_REASON = {
  COVID_ATG: 'Rapid SARS Antigen Test (COVID-19)',
  OTHER: 'Other',
  SORE_THROAT: 'Sore Throat',
  HEADACHE: 'Headache',
  COLD_SYMPTOMS: 'Cold Symptoms',
  FEVER: 'Fever',
  COVID_EXPOSURE: 'Covid Exposure',
  TRAINING: 'Training',
  NAUSEA: 'Nausea/Vomiting',
  GSH_REMOTE_TESTING: 'GSH Remote Testing',
  ABDOMINAL_PAIN: 'Abdominal Pain',
  WCP: 'WCP',
  PINK_EYE: 'Pink Eye',
  RASH: 'Rash',
  MENSTRUAL: 'Menstrual Cramps',
  STOMACH_ACHE: 'Stomach Ache',
  WOUNDS: 'Minor Abrasions/Cuts/Wounds',
  COVID_TEST: 'Covid-19 Test',
  INJURY: 'Injury',
}

export const ALL_VISIT_REASONS = 'All Visit Reasons'
