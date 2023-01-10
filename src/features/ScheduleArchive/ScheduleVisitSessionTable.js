import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Form, Row, Col, Button, Badge, Image } from 'react-bootstrap'
import ToolkitProvider from 'react-bootstrap-table2-toolkit'
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from 'react-bootstrap-table2-paginator'
import { Table, SortingCustomIcon } from 'components/atoms/Table'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { USER_ROLES } from 'constants/users'
import { VISITS_STATUS } from 'constants/visits'
import { convertDateToUTC } from 'utils/datePicker'
import { isEmpty } from 'utils/isEmpty'
import { handleTableSort } from 'utils/handleTableSort'
import { TEST_RESULT, SIZE_PER_PAGE } from './scheduleArchive.constants'
import Icons from '../../assets/icons'
import { actions } from './scheduleArchive.slice'
import { SCHEDULE_ARCHIVE_MODAL } from '../ScheduleArchiveModal/scheduleArchiveModal.constants'
import { SELECTED_MODAL } from '../ScreeningDataDashboard/screeningDataDashboard.constants'
import { actions as action } from '../ScreeningDataDashboard/screeningDataDashboard.slice'
import {
  selectScheduledVisits,
  selectScheduleVisitSessionFilter,
} from './scheduleArchive.selectors'
import { selectCurrentUserHasPermissions } from '../../infrastructure/userContext/userContext.selectors'
import { useFetchVisitsOfSchedule } from './scheduleArchive.effects'
import { dobFormatter } from '../../helpers/dobFormatter'
import VisitsTableSkeleton from '../Skeleton/VisitsTableSkeleton'
import { fetchVisitsOfSchedule } from './scheduleArchive.asyncActions'
import { getNamedBusyIndicator } from '../../widgets/busyIndicator/busyIndicator.selectors'

const {
  setScheduleArchiveModal,
  saveSelectedPatient,
  setScheduleVisitSessionFilter,
} = actions
const { saveSelectedModal } = action

const ScheduleVisitSessionTable = ({ sessionId }) => {
  const dispatch = useDispatch()
  const scheduledVisits = useSelector(selectScheduledVisits(sessionId))
  const scheduleVisitSessionFilter = useSelector(
    selectScheduleVisitSessionFilter
  )
  const currentUserHasPermissions = useSelector(selectCurrentUserHasPermissions)
  const isTestAdmin = currentUserHasPermissions([USER_ROLES.TEST_ADMIN])
  const show = useSelector(
    getNamedBusyIndicator(BUSY_INDICATOR_NAME.FETCH_VISITS_OF_SCHEDULE)
  )
  const [tableFilters, setTableFilters] = useState({})

  const [formattedScheduledVisits, setFormattedScheduledVisits] = useState()

  const handleTableFilters = useCallback(
    ({ type, page, sizePerPage, sortField, searchText, sortOrder }) => {
      if (isEmpty(tableFilters)) {
        setFormattedScheduledVisits(scheduledVisits)
        dispatch(
          setScheduleVisitSessionFilter({
            page: 1,
            data: scheduledVisits.slice(0, SIZE_PER_PAGE),
            limit: SIZE_PER_PAGE,
          })
        )
      } else {
        const currentPage = (page - 1) * sizePerPage
        const result = scheduledVisits.filter(
          (patient) =>
            patient.firstName
              .toLowerCase()
              .startsWith(searchText.toLowerCase()) ||
            patient.lastName.toLowerCase().startsWith(searchText.toLowerCase())
        )
        if (type === 'search' && searchText) {
          let formattedData = result
          if (sortField !== null) {
            formattedData = handleTableSort(
              formattedData,
              sortField,
              sortOrder,
              currentPage,
              sizePerPage
            )
          }
          setFormattedScheduledVisits(result)
          dispatch(
            setScheduleVisitSessionFilter({
              page: 1,
              data: sortField
                ? formattedData.slice(0, sizePerPage)
                : result.slice(0, sizePerPage),
              limit: sizePerPage,
            })
          )
        } else if (type === 'pagination' && searchText) {
          let formattedData = result
          if (sortField !== null) {
            formattedData = handleTableSort(
              formattedData,
              sortField,
              sortOrder,
              currentPage,
              sizePerPage
            )
          }
          dispatch(
            setScheduleVisitSessionFilter({
              page,
              data: sortField
                ? formattedData
                : formattedData.slice(currentPage, currentPage + sizePerPage),
              limit: sizePerPage,
            })
          )
        } else if (type === 'sort' && sortField !== null) {
          let formattedData = searchText ? result : scheduledVisits
          formattedData = handleTableSort(
            formattedData,
            sortField,
            sortOrder,
            currentPage,
            sizePerPage
          )
          dispatch(
            setScheduleVisitSessionFilter({
              page,
              data: formattedData,
              limit: sizePerPage,
            })
          )
        } else {
          let formattedData = scheduledVisits
          if (sortField !== null) {
            formattedData = handleTableSort(
              formattedData,
              sortField,
              sortOrder,
              currentPage,
              sizePerPage
            )
          }
          setFormattedScheduledVisits(scheduledVisits)
          dispatch(
            setScheduleVisitSessionFilter({
              page,
              data: sortField
                ? formattedData
                : scheduledVisits.slice(currentPage, currentPage + sizePerPage),
              limit: sizePerPage,
            })
          )
        }
      }
    },
    [dispatch, tableFilters, scheduledVisits]
  )

  useFetchVisitsOfSchedule(sessionId)

  useEffect(() => {
    return () => {
      dispatch(setScheduleVisitSessionFilter({}))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchVisitsOfSchedule(sessionId))
  }, [dispatch, sessionId])

  useEffect(() => {
    if (isEmpty(scheduleVisitSessionFilter) && !isEmpty(scheduledVisits)) {
      dispatch(
        setScheduleVisitSessionFilter({
          page: 1,
          data: scheduledVisits && scheduledVisits.slice(0, SIZE_PER_PAGE),
          limit: SIZE_PER_PAGE,
        })
      )
      setFormattedScheduledVisits(scheduledVisits)
      setTableFilters({})
    }
  }, [dispatch, scheduledVisits, scheduleVisitSessionFilter])

  useEffect(() => {
    if (!isEmpty(scheduledVisits)) {
      handleTableFilters(tableFilters)
    }
  }, [tableFilters, scheduledVisits, handleTableFilters])

  const statusFormatter = (status, row, index) => (
    <Badge
      variant={
        status === VISITS_STATUS.COMPLETED ||
        status === VISITS_STATUS.TEST_DENIED
          ? 'outline-success'
          : status === VISITS_STATUS.ENDED && !row.visitMetadata.testReport
          ? 'outline-danger'
          : 'outline-warning'
      }
      className={`font-weight-bold badge-sm e2e-session-status-${index}`}
    >
      {status === VISITS_STATUS.ENDED && !row.visitMetadata.testReport
        ? 'Waiting For Result'
        : status === VISITS_STATUS.COMPLETED
        ? 'Complete'
        : status}
    </Badge>
  )
  const actionFormatter = (id, row) => {
    const { testReport } = row.visitMetadata
    if (testReport) {
      return (
        <div className='d-flex'>
          {/* PERMISSION:- Can add test results to the visit. */}
          {isTestAdmin &&
            row.status !== VISITS_STATUS.TEST_DENIED &&
            row.status !== VISITS_STATUS.COMPLETED && (
              <Button
                variant='link'
                className='btn-auto p-0 mr-15'
                onClick={() => {
                  dispatch(
                    setScheduleArchiveModal(
                      SCHEDULE_ARCHIVE_MODAL.TEST_RESULT_MODAL
                    )
                  )
                  dispatch(saveSelectedModal(SELECTED_MODAL.EDIT_TEST_RESULT))
                  dispatch(saveSelectedPatient(row))
                }}
              >
                <Image src={Icons.editIcon} width='18' alt='edit-icon' />
              </Button>
            )}
          <Badge
            variant={
              testReport === TEST_RESULT.NEGATIVE
                ? 'outline-success'
                : 'outline-danger'
            }
            className={`font-weight-bold badge-sm btn-small e2e-session-test-result-${testReport?.toLowerCase()}`}
          >
            {testReport}
          </Badge>
        </div>
      )
      // PERMISSION:- Can add test results to the visit.
    } else if (row.status === VISITS_STATUS.ENDED && isTestAdmin) {
      return (
        <div className='text-center'>
          <Button
            variant='primary'
            className='btn-25 btn-block e2e-session-add-test-result'
            onClick={() => {
              dispatch(
                setScheduleArchiveModal(
                  SCHEDULE_ARCHIVE_MODAL.TEST_RESULT_MODAL
                )
              )
              dispatch(saveSelectedModal(SELECTED_MODAL.TEST_RESULT))
              dispatch(saveSelectedPatient(row))
            }}
          >
            Add test result
          </Button>
        </div>
      )
    }
  }

  const columns = [
    {
      dataField: 'lastName',
      text: 'Last Name',
      sort: true,
      sortCaret: SortingCustomIcon,
      formatExtraData: 'isDarkCaret',
    },
    {
      dataField: 'firstName',
      text: 'First Name',
      sort: true,
      sortCaret: SortingCustomIcon,
      formatExtraData: 'isDarkCaret',
    },
    {
      dataField: 'dateOfBirth',
      text: 'DOB',
      sort: true,
      formatter: (cell, { dateOfBirth }) =>
        dobFormatter(convertDateToUTC(dateOfBirth), dateOfBirth),
      sortCaret: SortingCustomIcon,
      formatExtraData: 'isDarkCaret',
      searchable: false,
    },
    {
      dataField: 'patientId',
      text: 'ID',
      sort: true,
      sortCaret: SortingCustomIcon,
      formatExtraData: 'isDarkCaret',
      searchable: false,
    },
    {
      dataField: 'status',
      text: 'Status',
      formatter: statusFormatter,
      sort: true,
      sortCaret: SortingCustomIcon,
      formatExtraData: 'isDarkCaret',
      serachable: false,
    },
    {
      dataField: 'visitMetadata.visitTime',
      text: 'Visit Time',
      sort: true,
      sortCaret: SortingCustomIcon,
      formatExtraData: 'isDarkCaret',
      searchable: false,
    },
    {
      dataField: 'visitMetadata.testReport',
      text: 'Actions',
      formatter: actionFormatter,
      searchable: false,
    },
  ]

  const onTableChange = (
    type,
    { page, sizePerPage, searchText, sortField, sortOrder }
  ) => {
    setTableFilters({
      type: type,
      page: page,
      sizePerPage: sizePerPage,
      sortField: sortField,
      searchText: searchText,
      sortOrder: sortOrder,
    })
  }

  return show ? (
    <VisitsTableSkeleton columns={7} />
  ) : (
    <>
      {scheduledVisits && (
        <ScheduleVisitSessionTablePagination
          columns={columns}
          data={scheduleVisitSessionFilter.data || []}
          page={scheduleVisitSessionFilter.page}
          onTableChange={onTableChange}
          totalSize={
            (!isEmpty(formattedScheduledVisits) &&
              formattedScheduledVisits.length) ||
            0
          }
        />
      )}
    </>
  )
}

const ScheduleVisitSessionTablePagination = ({
  data,
  page,
  totalSize,
  columns,
  onTableChange,
}) => {
  return (
    <PaginationProvider
      pagination={paginationFactory({
        custom: true,
        page,
        sizePerPage: SIZE_PER_PAGE,
        withFirstAndLast: false,
        totalSize,
        prePageText: 'Back',
        nextPageText: 'Next',
      })}
    >
      {({ paginationProps, paginationTableProps }) => (
        <ToolkitProvider keyField='id' data={data} columns={columns} search>
          {({ searchProps, baseProps }) => (
            <>
              <Card className='overflow-hidden mb-30 border-none'>
                <Card.Header className='bg-white border-0 p-20 pb-15'>
                  <Row className='align-items-center'>
                    <Col md={2} className='white-space-nowrap px-0'>
                      <h5 className='f-16 mb-0 lh-25 font-weight-bold'>
                        Scheduled Patients
                      </h5>
                    </Col>
                    <Col md={4}>
                      <Form.Control
                        type='text'
                        name='submission-by-locataion'
                        className='search-control'
                        placeholder='Search'
                        value={searchProps.searchText}
                        onChange={(ev) => searchProps.onSearch(ev.target.value)}
                      />
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body className='p-0'>
                  <Table
                    {...paginationTableProps}
                    {...baseProps}
                    remote={{ sort: true, pagination: true, search: true }}
                    keyField='id'
                    columns={columns}
                    onTableChange={onTableChange}
                    data={data}
                    isLightBg={true}
                    isLightFont={true}
                    isRightAlign={true}
                  />
                </Card.Body>
              </Card>
              {data.length > 0 && (
                <PaginationListStandalone {...paginationProps} />
              )}
            </>
          )}
        </ToolkitProvider>
      )}
    </PaginationProvider>
  )
}

export default ScheduleVisitSessionTable
