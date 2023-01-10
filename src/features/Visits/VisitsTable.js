import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Button, Col } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { withFeature } from 'flagged'
import { SortingCustomIcon } from 'components/atoms/Table'
import { Table } from 'components/atoms/Table'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { USER_ROLES } from 'constants/users'
import { VISITS_STATUS } from 'constants/visits'
import { getFormattedDate } from 'utils/datePicker'
import {
  convertDateTimeToSeconds,
  getFormattedTimeFromSeconds,
} from 'utils/timer'
import { isEmptyObject } from 'utils/isEmptyObject'
import { Timer } from 'components/atoms/Timer'
import { actions } from './visits.slice'
import {
  selectSelectedVisitModal,
  selectVisits,
  selectVisitsFilters,
  selectVisitsAndSessionFilters,
} from './visits.selector'
import { VISIT_MODALS } from '../visitModals/visitModals.constants'
import getVisitModal from '../visitModals'
import { useFetchVisits } from './visits.effects'
import { fetchVisitDetails } from '../VisitItem'
import VisitsTableSkeleton from '../Skeleton/VisitsTableSkeleton'
import { selectCurrentUserHasPermissions } from '../../infrastructure/userContext'
import { getNamedBusyIndicator } from '../../widgets/busyIndicator/busyIndicator.selectors'
import { fetchVisits } from './visits.asyncActions'
import {
  EmptyVisitDataAfterSearch,
  EmptyVisitData,
} from '../../helpers/emptyDataIndicators'
import { dobFormatter } from '../../helpers/dobFormatter'

const {
  saveSelectedVisit,
  setSelectedVisitModal,
  resetVisits,
  resetVisitsFilters,
  resetVisitsAndSessionFilters,
} = actions

const VisitsTable = ({ status: statusArr, isProviderDashboard }) => {
  const isWaitingStatus = statusArr.includes(VISITS_STATUS.WAITING)
  const router = useRouter()
  const dispatch = useDispatch()
  const visits = useSelector(selectVisits)
  const selectedVisitModal = useSelector(selectSelectedVisitModal)
  const visitsFilter = useSelector(selectVisitsFilters)
  const VisitsAndSessionFilters = useSelector(selectVisitsAndSessionFilters)
  const currentUserHasPermissions = useSelector(selectCurrentUserHasPermissions)
  const isProvider = currentUserHasPermissions([USER_ROLES.PROVIDER])
  const isVisitsBusyIndicatorActive = useSelector(
    getNamedBusyIndicator(BUSY_INDICATOR_NAME.FETCH_VISITS)
  )

  useEffect(() => {
    return () => {
      dispatch(resetVisits())
      // PERMISSION:- Can Read visits
      dispatch(
        isProvider ? resetVisitsFilters() : resetVisitsAndSessionFilters()
      )
    }
  }, [dispatch, isProvider])
  // PERMISSION:- Can Read visits
  useFetchVisits(isProvider ? visitsFilter : VisitsAndSessionFilters)

  useEffect(() => {
    // PERMISSION:- Can Read visits
    dispatch(fetchVisits(isProvider ? visitsFilter : VisitsAndSessionFilters))
  }, [dispatch, visitsFilter, VisitsAndSessionFilters, isProvider])

  //TODO: Replace role check with extraction of role and using it to fetch role specific values like we did for session logs
  const isActionNeeded = (visit) =>
    isProvider ? !visit.providerCompleted : !visit.facilitatorCompleted

  const filteredVisits = visits.filter(
    (visit) =>
      statusArr.includes(visit.status) ||
      (isProviderDashboard &&
        visit.status === VISITS_STATUS.ENDED &&
        isActionNeeded(visit))
  )

  // PERMISSION:- Can Read visits
  const noDataIndicator = !isEmptyObject(
    isProvider ? visitsFilter : VisitsAndSessionFilters
  )
    ? EmptyVisitDataAfterSearch
    : isProvider && EmptyVisitData

  const statusFormatter = (status, row) => (
    <Badge
      variant={
        status === VISITS_STATUS.COMPLETED
          ? 'outline-success'
          : status === VISITS_STATUS.ENDED
          ? 'outline-danger'
          : 'outline-warning'
      }
      className='f-14 font-weight-bold btn-md'
    >
      {status === VISITS_STATUS.ENDED && isActionNeeded(row)
        ? 'Action Needed'
        : status}
    </Badge>
  )

  const viewFormatter = (id, row, idx) => (
    <Button
      id='viewButton'
      className={`pendo-visit-button pendo-visit visit-button-${idx}`}
      size='md'
      data-test={`view-button-${row.id}`}
      variant='light'
      onClick={() => {
        dispatch(saveSelectedVisit(row))
        // PERMISSION:- Can Read visits
        if (row.status === VISITS_STATUS.WAITING && isProvider) {
          dispatch(setSelectedVisitModal(VISIT_MODALS.CLAIM_VISIT_REQUEST))
          dispatch(fetchVisitDetails({ visitId: id }))
          // PERMISSION:- Can Read Created/Claimed Visits
        } else router.push(`/visit/${id}`)
      }}
    >
      View
    </Button>
  )

  const getTimerFormatter = (cell, row) => {
    if (row.status === VISITS_STATUS.COMPLETED) {
      const timeDiffInSeconds = Math.abs(
        convertDateTimeToSeconds(row.createdAt) -
          convertDateTimeToSeconds(row.date)
      )
      return getFormattedTimeFromSeconds(timeDiffInSeconds)
    } else return <Timer initialTime={row.createdAt} />
  }

  const columns = [
    {
      dataField: 'lastName',
      text: 'Last Name',
      sort: true,
      sortCaret: SortingCustomIcon,
      formatter: (val, { dateOfBirth }) => dobFormatter(val, dateOfBirth),
    },
    {
      dataField: 'firstName',
      text: 'First Name',
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
      // TODO: What to show here if isWaiting and isInprogress
      dataField: isWaitingStatus ? 'createdAt' : 'date',
      text: isWaitingStatus ? 'Total Time' : 'Date',
      sort: true,
      sortCaret: SortingCustomIcon,
      formatter: !isWaitingStatus ? getFormattedDate : getTimerFormatter,
    },
    {
      dataField: 'status',
      text: 'Visit Status',
      formatter: statusFormatter,
    },
    {
      dataField: 'id',
      text: '',
      formatter: viewFormatter,
      classes: 'align-item-right',
      sortCaret: SortingCustomIcon,
    },
  ]
  return isVisitsBusyIndicatorActive ? (
    <VisitsTableSkeleton columns={9} />
  ) : (
    <>
      {selectedVisitModal && getVisitModal(selectedVisitModal)}
      <Col lg={12}>
        <Table
          keyField='id'
          columns={columns}
          data={filteredVisits}
          footerMargin='mb-50'
          noVerticalSpace={true}
          isLightFont={true}
          noDataIndication={noDataIndicator}
        />
      </Col>
    </>
  )
}

export default withFeature('visitsTable')(VisitsTable)
