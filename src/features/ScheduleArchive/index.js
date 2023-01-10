import ScheduleArchive from './ScheduleArchive'
import * as selectors from './scheduleArchive.selectors'
import slice from './scheduleArchive.slice'
import * as effects from './scheduleArchive.effects'

export const { name, actions, reducer } = slice

export const {
  selectScheduleArchiveData,
  selectSelectedPatient,
  selectSelectedSession,
  selectScheduleVisitSessionFilter,
  selectSchedulePatientDetailFilter,
} = selectors

export const {
  useFetchScheduleArchiveData,
  useFetchVisitsOfSchedule,
  useFetchSchedulePatients,
} = effects

export default ScheduleArchive
