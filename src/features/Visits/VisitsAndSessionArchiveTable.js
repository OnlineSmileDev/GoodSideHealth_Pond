import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Badge } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { withFeature } from 'flagged'
import { Table, SortingCustomIcon } from 'components/atoms/Table'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { getFormattedDate } from 'utils/datePicker'
import { convertFirstCharToUpperCaseAndAddSpaces } from 'utils/convertFirstCharToUpperCaseAndAddSpaces'
import { isEmptyObject } from 'utils/isEmptyObject'
import { customNumberSort } from 'utils/customNumberSort'
import { VISITS_STATUS } from 'constants/visits'
import VisitsTableSkeleton from '../Skeleton/VisitsTableSkeleton'
import { useFetchScheduleArchiveData } from '../ScheduleArchive/scheduleArchive.effects'
import { selectScheduleArchiveData } from '../ScheduleArchive/scheduleArchive.selectors'
import { useFetchVisits } from './visits.effects'
import { actions } from './visits.slice'
import { actions as action } from '../ScheduleArchive/scheduleArchive.slice'
import { getNamedBusyIndicator } from '../../widgets/busyIndicator/busyIndicator.selectors'
import { fetchVisits } from './visits.asyncActions'
import { fetchScheduleArchiveData } from '../ScheduleArchive/scheduleArchive.asyncActions'
import { SESSION_STATUS } from '../VisitSession/visitSession.constants'
import { EmptyVisitDataAfterSearch } from '../../helpers/emptyDataIndicators'
import { selectVisitsAndSessionFilters, selectVisits } from './visits.selector'

const { saveSelectedVisit, resetVisitsAndSessionFilters, resetVisits } = actions
const { resetScheduleArchiveData } = action

const VisitsAndSessionArchiveTable = () => {
  const visitsAndSessionFilters = useSelector(selectVisitsAndSessionFilters)
  const router = useRouter()
  const dispatch = useDispatch()
  const visits = useSelector(selectVisits)
  const scheduledVisits = useSelector(selectScheduleArchiveData)
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
    dispatch(
      fetchScheduleArchiveData({
        ...visitsAndSessionFilters,
        status: SESSION_STATUS.COMPLETED,
      })
    )
    dispatch(fetchVisits(visitsAndSessionFilters))
  }, [dispatch, visitsAndSessionFilters])
  useFetchVisits(visitsAndSessionFilters)
  useFetchScheduleArchiveData({
    ...visitsAndSessionFilters,
    status: SESSION_STATUS.COMPLETED,
  })
  const filteredVisits = visits.filter(
    (each) => each.status === VISITS_STATUS.COMPLETED
  )
  const formattedVisits = [...scheduledVisits, ...filteredVisits]
  const statusFormatter = (status, row) => (
    <Badge
      variant={
        status === VISITS_STATUS.COMPLETED ||
        status === SESSION_STATUS.COMPLETED
          ? 'outline-success'
          : status === VISITS_STATUS.ENDED
          ? 'outline-danger'
          : 'outline-warning'
      }
      className='f-14 font-weight-bold btn-md'
    >
      {convertFirstCharToUpperCaseAndAddSpaces(status)}
    </Badge>
  )
  const viewFormatter = (id, row) => (
    <Button
      id='viewButton'
      size='md'
      data-test={`view-button-${row.id}`}
      // TODO: Determine if id is better fit than the classname for pendo
      className='pendo-visits-sessions-archive-view-button'
      variant='light'
      onClick={() => {
        if (row.sessionType) {
          router.push(`/sessions/${id}`)
        } else {
          dispatch(saveSelectedVisit(row))
          router.push(`/visit/${id}`)
        }
      }}
    >
      View
    </Button>
  )
  const nameFormatter = (cell, row) =>
    cell || `${row.firstName} ${row.lastName}`
  const reasonFormatter = (cell, row) => cell || row.sessionType
  const dateFormatter = (cell, row) => getFormattedDate(cell || row.date)
  const participantFormatter = (cell) => cell || 1
  const noDataIndication =
    !isEmptyObject(visitsAndSessionFilters) && EmptyVisitDataAfterSearch
  const columns = [
    {
      dataField: 'name',
      text: 'Name',
      formatter: nameFormatter,
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
      dataField: 'visitReason',
      text: 'Visit Reason',
      formatter: reasonFormatter,
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
      text: 'Date',
      sort: true,
      sortCaret: SortingCustomIcon,
      formatter: dateFormatter,
    },
    {
      dataField: 'visitCount',
      text: 'Participants',
      formatter: participantFormatter,
      sort: true,
      sortCaret: SortingCustomIcon,
    },
    {
      dataField: 'status',
      text: 'Visit Status',
      sort: true,
      sortFunc: customNumberSort,
      formatter: statusFormatter,
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
  return isVisitsBusyIndicatorActive && isScheduleArchiveBusyIndicatorActive ? (
    <VisitsTableSkeleton columns={9} />
  ) : (
    <Col lg={12}>
      <Table
        keyField='id'
        columns={columns}
        data={formattedVisits}
        footerMargin='mb-50'
        noVerticalSpace={true}
        isLightFont={true}
        noDataIndication={
          !isVisitsBusyIndicatorActive &&
          !isScheduleArchiveBusyIndicatorActive &&
          noDataIndication
        }
      />
    </Col>
  )
}
export default withFeature('visitAndSessionArchiveTable')(
  VisitsAndSessionArchiveTable
)
