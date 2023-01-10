// Test Data
export const STATIONS: Array<StationType> = [
  {
    id: 1,
    position: 1,
    title: 'Registration',
    code: 'registration',
    station_visits: [],
  },
  {
    id: 2,
    position: 2,
    title: 'Height & Weight',
    code: 'height_and_weight',
    station_visits: [],
  },
  {
    id: 3,
    position: 3,
    title: 'Vision',
    code: 'vision',
    station_visits: [],
  },
  {
    id: 4,
    position: 4,
    title: 'Musculoskeletal',
    code: 'musculoskeletal',
    station_visits: [],
  },
  {
    id: 5,
    position: 5,
    title: 'Screenings',
    code: 'screenings',
    station_visits: [],
  },
  {
    id: 6,
    position: 6,
    title: 'Physical Exam Order',
    code: 'medical_assessment',
    station_visits: [],
  },
  {
    id: 7,
    position: 7,
    title: 'Check Out',
    code: 'checkout',
    station_visits: [],
  },
  {
    id: 8,
    position: 8,
    title: 'Complete',
    code: 'complete',
    station_visits: [],
  },
]

// ToDo: Move to `station_orders` and `config` table
export const StationOrdersConfig = {
  registration: [],
  heightAndWeight: ['height_and_weight'],
  vision: ['vision'],
  musculoskeletal: ['musculoskeletal'],
  screenings: [],
  medicalAssessment: ['medical_assessment'],
  checkout: [],
  complete: [],
}

// Types
export interface SessionType {
  id: number
  name?: string
  description?: string
  // stations: Array<StationType>
}

export interface StationType {
  id: number
  position: number
  title: string
  code: string
  visit_action_name?: string
  station_visits: Array<StationVisitsType>
}

export interface StationVisitsType {
  visit: VisitType
}

export interface VisitType {
  id: number
  last_name?: string
  first_name?: string
  date_of_birth?: string
  student_id?: string
  patient_id?: string
  has_uil_printed: boolean
}

// Kept only for the reference. The actual usage works via DB `stations` table `visit_action_name` field
export const STATION_VISIT_ACTION = {
  registration: 'Upload Paperwork',
  height_and_weight: 'Add Results',
  vision: 'Add Results',
  musculoskeletal: 'Add Results',
  screenings: 'Add Results',
  medical_assessment: 'Add Results',
  checkout: 'View Visit',
  complete: 'View Visit',
}

export const VISIT_ACTION_NAME = {
  UPLOAD_PAPERWORK: 'Upload Paperwork',
  ADD_RESULTS: 'Add Results',
  VIEW_VISIT: 'View Visit',
}

export const CLEARANCE_STATUS = {
  CLEARED: 'cleared',
  CLEARED_AFTER_EVAL: 'clearedAfterCompletingEvaluation',
  NOT_CLEARED: 'notCleared',
}
