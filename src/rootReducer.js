import { combineReducers } from 'redux'
import {
  name as busyIndicatorName,
  reducer as busyIndicatorReducer,
} from './widgets/busyIndicator/busyIndicator.slice'
import {
  name as modalName,
  reducer as modalReducer,
} from './widgets/modal/modal.slice'
import {
  name as pendingRequestName,
  reducer as pendingRequestReducer,
} from './infrastructure/pendingRequest/pendingRequest.slice'
import {
  name as notificationPopupName,
  reducer as notificationPopupReducer,
} from './infrastructure/notificationPopup/notificationPopup.slice'
import {
  name as WizardName,
  reducer as WizardReducer,
} from './widgets/Wizard/wizard.slice'
import {
  name as VisitsName,
  reducer as VisitsReducer,
} from './features/Visits/visits.slice'
import {
  name as VisitItemName,
  reducer as VisitItemReducer,
} from './features/VisitItem/visitItem.slice'
import {
  name as usersName,
  reducer as usersReducer,
} from './features/Users/users.slice'
import {
  name as userContextName,
  reducer as userContextReducer,
} from './infrastructure/userContext/userContext.slice'
import {
  name as screeningDashboardName,
  reducer as screeningDashboardReducer,
} from './features/ScreeningDataDashboard/screeningDataDashboard.slice'
import {
  name as scheduleArchiveName,
  reducer as scheduleArchiveReducer,
} from './features/ScheduleArchive/scheduleArchive.slice'
import {
  name as visitSessionName,
  reducer as visitSessionReducer,
} from './features/VisitSession/visitSession.slice'
import {
  name as PatientsName,
  reducer as PatientsReducer,
} from './features/Patients/patients.slice'

import {
  name as PatientItemName,
  reducer as PatientItemReducer,
} from './features/PatientItem/patientItem.slice'

export default combineReducers({
  [busyIndicatorName]: busyIndicatorReducer,
  [modalName]: modalReducer,
  [pendingRequestName]: pendingRequestReducer,
  [notificationPopupName]: notificationPopupReducer,
  [usersName]: usersReducer,
  [WizardName]: WizardReducer,
  [VisitsName]: VisitsReducer,
  [VisitItemName]: VisitItemReducer,
  [userContextName]: userContextReducer,
  [screeningDashboardName]: screeningDashboardReducer,
  [scheduleArchiveName]: scheduleArchiveReducer,
  [visitSessionName]: visitSessionReducer,
  [PatientsName]: PatientsReducer,
  [PatientItemName]: PatientItemReducer,
})
