import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { withFeature } from 'flagged'
import { Table, SortingCustomIcon } from 'components/atoms/Table'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { getFormattedDate } from 'utils/datePicker'
import { getFormattedTime } from 'utils/getFormattedTime'
import { isEmptyObject } from 'utils/isEmptyObject'
import { customNumberSort } from 'utils/customNumberSort'
import { selectSessionsFilters } from './visits.selector'
import VisitsTableSkeleton from '../Skeleton/VisitsTableSkeleton'
import { updateVisitSession } from '../VisitSession/visitSession.asyncActions'
import { useFetchScheduleArchiveData } from '../ScheduleArchive/scheduleArchive.effects'
import { selectScheduleArchiveData } from '../ScheduleArchive/scheduleArchive.selectors'
import { SESSION_STATUS } from '../VisitSession/visitSession.constants'
import { actions } from '../ScheduleArchive/scheduleArchive.slice'
import { getNamedBusyIndicator } from '../../widgets/busyIndicator/busyIndicator.selectors'
import { fetchScheduleArchiveData } from '../ScheduleArchive/scheduleArchive.asyncActions'
import { actions as action } from './visits.slice'
import {
  EmptyVisitDataAfterSearch,
  EmptyVisitData,
} from '../../helpers/emptyDataIndicators'

const { resetScheduleArchiveData } = actions
const { resetSessionsFilters } = action

const SessionsTable = () => {
  const scheduledVisits = useSelector(selectScheduleArchiveData)
  const sessionsFilters = useSelector(selectSessionsFilters)
  const router = useRouter()
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

  const sessionTimeFormatter = (time, row) => getFormattedTime(time)

  const noDataIndicator = !isEmptyObject(sessionsFilters)
    ? EmptyVisitDataAfterSearch
    : EmptyVisitData

  const viewFormatter = (id, row) => (
    <Button
      id='viewButton'
      size='md'
      data-test={`view-button-${row.id}`}
      variant={`${
        row.status === SESSION_STATUS.WAITING ||
        row.status === SESSION_STATUS.IN_PROGRESS
          ? 'secondary'
          : 'light'
      }`}
      className='font-weight-bold pendo-sesson-button'
      onClick={() => {
        if (
          row.status === SESSION_STATUS.NEW ||
          row.status === SESSION_STATUS.WAITING
        ) {
          const updatedSession = { status: SESSION_STATUS.IN_PROGRESS }
          dispatch(updateVisitSession({ id: id, updatedSession })).then(() =>
            router.push(`/sessions/${id}`)
          )
        } else {
          router.push(`/sessions/${id}`)
        }
      }}
    >
      {row.status === SESSION_STATUS.NEW
        ? 'Start Session'
        : row.status === SESSION_STATUS.WAITING ||
          row.status === SESSION_STATUS.IN_PROGRESS
        ? 'Resume'
        : 'View Session'}
    </Button>
  )

  const columns = [
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
      sortCaret: SortingCustomIcon,
    },
    {
      dataField: 'locationName',
      text: 'Location',
      sort: true,
      sortCaret: SortingCustomIcon,
    },
    {
      dataField: 'state',
      text: 'State',
      sort: true,
      sortCaret: SortingCustomIcon,
    },
    {
      dataField: 'sessionType',
      text: 'Test',
      sort: true,
      sortCaret: SortingCustomIcon,
    },
    {
      dataField: 'language',
      text: 'Language',
      sort: true,
      sortCaret: SortingCustomIcon,
    },
    {
      dataField: 'sessionStartDate',
      text: 'Visit Date',
      sort: true,
      sortCaret: SortingCustomIcon,
      formatter: getFormattedDate,
    },
    {
      dataField: 'sessionTime',
      text: 'Visit Time',
      formatter: sessionTimeFormatter,
      sort: true,
      sortCaret: SortingCustomIcon,
    },
    {
      dataField: 'visitCount',
      text: 'Participants',
      sort: true,
      sortFunc: customNumberSort,
      sortCaret: SortingCustomIcon,
    },
    {
      dataField: 'id',
      text: '',
      formatter: viewFormatter,
      classes: 'align-item-right',
      sortCaret: SortingCustomIcon,
    },
  ]

  const filteredScheduledVisits = scheduledVisits.filter(
    (each) => each.status !== SESSION_STATUS.COMPLETED
  )

  return isScheduleArchiveBusyIndicatorActive ? (
    <VisitsTableSkeleton columns={9} />
  ) : (
    <Col lg={12}>
      <Table
        keyField='id'
        columns={columns}
        data={filteredScheduledVisits}
        footerMargin='mb-50'
        noVerticalSpace={true}
        isLightFont={true}
        noDataIndication={noDataIndicator}
      />
    </Col>
  )
}

export default withFeature('sessionsTable')(SessionsTable)
