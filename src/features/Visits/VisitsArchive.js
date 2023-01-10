import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFeatures, withFeature } from 'flagged'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { USER_ROLES } from 'constants/users'
import { isEmpty } from 'utils/isEmpty'
import { VISITS_STATUS, VISIT_STATUS_OPTIONS } from 'constants/visits'
import { actions } from './visits.slice'
import {
  selectVisitsAndSessionFilters,
  selectVisits,
  selectVisitsFilters,
} from './visits.selector'
import { usePrevious } from '../../hooks'
import Sounds from '../../assets/sounds'
import { selectUserDetails } from '../Users'
import { useFetchVisits } from './visits.effects'
import { getNamedBusyIndicator } from '../../widgets/busyIndicator/busyIndicator.selectors'
import { EmptyVisitDataCard } from '../../helpers/emptyDataIndicators'
import ArchiveCard from './ArchiveCard'
import { selectCurrentUserHasPermissions } from '../../infrastructure/userContext'
import useHasuraWebsocket from '../../hooks/useHasuraWebsocket'
import VisitsSubscription from 'graphql/VisitsSubscription.graphql'
import VisitsArchiveSkeleton from '../Skeleton/VisitsArchiveSkeleton'
import { fetchVisits } from './visits.asyncActions'

const {
  resetVisitsAndSessionFilters,
  resetVisits,
  resetVisitsFilters,
  setVisits,
} = actions

const formatVisitFiltersHasura = (filters) => {
  const { state, language, status, date, name } = filters
  const [startDate, endDate] = date.split(',')
  // empty array will count as value
  const name_search = name
    ? [
        { first_name: { _ilike: `%${name}%` } },
        { last_name: { _ilike: `%${name}%` } },
      ]
    : {}

  return {
    state: state ? { _eq: state } : {},
    language: language ? { _eq: language } : {},
    status: status ? { _eq: status } : {},
    created_at: date ? { _gte: startDate, _lt: endDate } : {},
    visit_metadata: { _is_null: true },
    name_search,
  }
}
// websocket fallback
const PollVisits = ({ filters, playNotificationSound }) => {
  const dispatch = useDispatch()
  const { isFetchedAfterMount, data } = useFetchVisits(filters)
  const queueVisits = data?.filter(
    ({ status }) => status === VISITS_STATUS.WAITING
  )
  const prevQueueVisits = usePrevious(queueVisits)

  useEffect(() => {
    const newVisits =
      prevQueueVisits &&
      queueVisits?.filter(
        (visit) => !prevQueueVisits.some(({ id }) => id === visit.id)
      )
    if (!isEmpty(newVisits) && playNotificationSound && isFetchedAfterMount) {
      new Audio(Sounds.Notification).play()
    }
  }, [queueVisits, prevQueueVisits, playNotificationSound, isFetchedAfterMount])

  useEffect(() => {
    dispatch(fetchVisits(filters))
  }, [dispatch, filters])

  return null
}

const VisitsArchive = () => {
  const { id, doNotificationsEnabled } = useSelector(selectUserDetails)
  const visits = useSelector(selectVisits)
  const dispatch = useDispatch()
  const visitsAndSessionFilters = useSelector(selectVisitsAndSessionFilters)
  const isVisitsBusyIndicatorActive = useSelector(
    getNamedBusyIndicator(BUSY_INDICATOR_NAME.FETCH_VISITS)
  )
  const {
    isSubscribing,
    subscribe,
    unsubscribeAll,
    subscribedData,
    hasWebsocketError,
  } = useHasuraWebsocket(
    VisitsSubscription,
    BUSY_INDICATOR_NAME.FETCH_VISITS,
    true
  )

  const currentUserHasPermissions = useSelector(selectCurrentUserHasPermissions)
  const isProvider = currentUserHasPermissions([USER_ROLES.PROVIDER])
  const visitsFilters = useSelector(selectVisitsFilters)
  const { queueSoundNotification, hasuraSubscriptions } = useFeatures()
  const isUsingSubscriptions =
    hasuraSubscriptions && isProvider && !hasWebsocketError

  // PERMISSION:- Can Read visits
  const formattedFilters = useMemo(
    () =>
      isProvider
        ? visitsFilters
        : { ...visitsAndSessionFilters, facilitatorId: id },
    [isProvider, visitsFilters, visitsAndSessionFilters, id]
  )

  // PERMISSION:- Can access Queue Notifications
  const playNotificationSound =
    doNotificationsEnabled && isProvider && queueSoundNotification

  useEffect(() => {
    return () => {
      dispatch(resetVisits())
      // PERMISSION:- Can Read visits
      dispatch(
        isProvider ? resetVisitsFilters() : resetVisitsAndSessionFilters()
      )
    }
  }, [dispatch, isProvider])

  // init hasura ws
  useEffect(() => {
    if (!isUsingSubscriptions) return

    // Only for Queue Visits
    const hasuraFilters = formatVisitFiltersHasura({
      ...(isProvider && { status: VISITS_STATUS.WAITING }),
      ...formattedFilters,
    })

    subscribe([{ key: 'visits', variables: hasuraFilters }])
    // subscribe can cause unnecessary rerendering; function is redefined when called
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUsingSubscriptions, formattedFilters, isProvider])

  useEffect(() => {
    if (!isUsingSubscriptions && isSubscribing) unsubscribeAll()
    else if (isSubscribing) return unsubscribeAll
    // unsubscribeAll can cause unnecessary rerendering
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUsingSubscriptions, isSubscribing])

  useEffect(() => {
    if (subscribedData.visits) dispatch(setVisits(subscribedData.visits))
  }, [subscribedData.visits, dispatch])

  const prevQueueVisits = usePrevious(visits)

  useEffect(() => {
    const newVisits =
      prevQueueVisits &&
      visits?.filter(
        (visit) => !prevQueueVisits.some(({ id }) => id === visit.id)
      )
    if (!isEmpty(newVisits) && playNotificationSound) {
      new Audio(Sounds.Notification).play()
    }
  }, [visits, prevQueueVisits, playNotificationSound])

  const filteredVisits = visits.filter(
    (each) => each.status === VISITS_STATUS.WAITING
  )

  return (
    <>
      {!isUsingSubscriptions && (
        <PollVisits
          filters={formattedFilters}
          playNotificationSound={playNotificationSound}
        />
      )}
      {isVisitsBusyIndicatorActive ? (
        // PERMISSION:- Can Read Created/Claimed Visits
        <VisitsArchiveSkeleton columns={2} isMyVisit={!isProvider} />
      ) : !isEmpty(isProvider ? filteredVisits : visits) ? (
        // PERMISSION:- Can Read visits
        isProvider ? (
          <ArchiveCard visits={filteredVisits} />
        ) : (
          VISIT_STATUS_OPTIONS.map((each) => (
            <ArchiveCard key={each} visits={visits} status={each} />
          ))
        )
      ) : (
        !isVisitsBusyIndicatorActive && <EmptyVisitDataCard />
      )}
    </>
  )
}
export default withFeature('visitsArchive')(VisitsArchive)
