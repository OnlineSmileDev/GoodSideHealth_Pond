import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withFeature } from 'flagged'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { VISITS_STATUS, VISIT_STATUS_OPTIONS } from 'constants/visits'
import { isEmpty } from 'utils/isEmpty'
import { capitalizeFirstLetterOfEachWord } from 'utils/capitalizeFirstLetterOfEachWord'
import { selectVisitsAndSessionFilters, selectVisits } from './visits.selector'
import { selectUserDetails } from '../Users'
import { useFetchScheduleArchiveData } from '../ScheduleArchive/scheduleArchive.effects'
import { selectScheduleArchiveData } from '../ScheduleArchive/scheduleArchive.selectors'
import { useFetchVisits } from './visits.effects'
import ArchiveCard from './ArchiveCard'
import { actions } from './visits.slice'
import { actions as action } from '../ScheduleArchive/scheduleArchive.slice'
import { EmptyVisitDataCard } from '../../helpers/emptyDataIndicators'
import { getNamedBusyIndicator } from '../../widgets/busyIndicator/busyIndicator.selectors'
import { fetchVisits } from './visits.asyncActions'
import { fetchScheduleArchiveData } from '../ScheduleArchive/scheduleArchive.asyncActions'
import VisitsArchiveSkeleton from '../Skeleton/VisitsArchiveSkeleton'

const { resetVisitsAndSessionFilters, resetVisits } = actions
const { resetScheduleArchiveData } = action

const VisitsAndSessionArchive = () => {
  const { id } = useSelector(selectUserDetails)
  const visits = useSelector(selectVisits)
  const dispatch = useDispatch()
  const scheduledVisits = useSelector(selectScheduleArchiveData)
  const visitsAndSessionFilters = useSelector(selectVisitsAndSessionFilters)

  const isVisitsBusyIndicatorActive = useSelector(
    getNamedBusyIndicator(BUSY_INDICATOR_NAME.FETCH_VISITS)
  )
  const isScheduleArchiveBusyIndicatorActive = useSelector(
    getNamedBusyIndicator(BUSY_INDICATOR_NAME.FETCH_SCHEDULE_ARCHIVE_DATA)
  )

  useEffect(() => {
    return () => {
      dispatch(resetVisits())
      dispatch(resetScheduleArchiveData())
      dispatch(resetVisitsAndSessionFilters())
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchScheduleArchiveData(visitsAndSessionFilters))
    dispatch(fetchVisits({ ...visitsAndSessionFilters, providerId: id }))
  }, [dispatch, visitsAndSessionFilters, id])

  useFetchVisits({ ...visitsAndSessionFilters, providerId: id })
  useFetchScheduleArchiveData(visitsAndSessionFilters)

  const formattedVisits = [...scheduledVisits, ...visits].filter(
    (each) =>
      capitalizeFirstLetterOfEachWord(each.status) !== VISITS_STATUS.WAITING &&
      capitalizeFirstLetterOfEachWord(each.status) !== VISITS_STATUS.NEW
  )

  return isScheduleArchiveBusyIndicatorActive || isVisitsBusyIndicatorActive ? (
    <VisitsArchiveSkeleton columns={2} isMyVisit />
  ) : !isEmpty(formattedVisits) ? (
    VISIT_STATUS_OPTIONS.map((each) => (
      <ArchiveCard key={each} visits={formattedVisits} status={each} />
    ))
  ) : (
    !isVisitsBusyIndicatorActive &&
    !isScheduleArchiveBusyIndicatorActive && <EmptyVisitDataCard />
  )
}
export default withFeature('visitAndSessionArchive')(VisitsAndSessionArchive)
