import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withFeature } from 'flagged'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { isEmpty } from 'utils/isEmpty'
import { selectSessionsFilters } from './visits.selector'
import { useFetchScheduleArchiveData } from '../ScheduleArchive/scheduleArchive.effects'
import { selectScheduleArchiveData } from '../ScheduleArchive/scheduleArchive.selectors'
import ArchiveCard from './ArchiveCard'
import { actions } from './visits.slice'
import { actions as action } from '../ScheduleArchive/scheduleArchive.slice'
import { EmptyVisitDataCard } from '../../helpers/emptyDataIndicators'
import { getNamedBusyIndicator } from '../../widgets/busyIndicator/busyIndicator.selectors'
import { fetchScheduleArchiveData } from '../ScheduleArchive/scheduleArchive.asyncActions'
import { SESSION_STATUS } from '../VisitSession/visitSession.constants'
import VisitsArchiveSkeleton from '../Skeleton/VisitsArchiveSkeleton'

const { resetScheduleArchiveData } = action
const { resetSessionsFilters } = actions

const SessionsArchive = () => {
  const scheduledVisits = useSelector(selectScheduleArchiveData)
  const sessionsFilters = useSelector(selectSessionsFilters)
  const dispatch = useDispatch()

  const isScheduleArchiveBusyIndicatorActive = useSelector(
    getNamedBusyIndicator(BUSY_INDICATOR_NAME.FETCH_SCHEDULE_ARCHIVE_DATA)
  )

  useEffect(() => {
    return () => {
      dispatch(resetScheduleArchiveData())
      dispatch(resetSessionsFilters())
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchScheduleArchiveData(sessionsFilters))
  }, [dispatch, sessionsFilters])

  useFetchScheduleArchiveData(sessionsFilters)

  const filteredScheduledVisits = scheduledVisits.filter(
    (each) =>
      each.status === SESSION_STATUS.WAITING ||
      each.status === SESSION_STATUS.NEW
  )

  return isScheduleArchiveBusyIndicatorActive ? (
    <VisitsArchiveSkeleton columns={2} />
  ) : !isEmpty(filteredScheduledVisits) ? (
    <ArchiveCard visits={filteredScheduledVisits} />
  ) : (
    !isScheduleArchiveBusyIndicatorActive && <EmptyVisitDataCard />
  )
}
export default withFeature('sessionsArchive')(SessionsArchive)
