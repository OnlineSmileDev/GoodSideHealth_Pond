import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Button, Badge, Image, Row, Col, Form } from 'react-bootstrap'
import ToolkitProvider from 'react-bootstrap-table2-toolkit'
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from 'react-bootstrap-table2-paginator'
import { Table, SortingCustomIcon } from 'components/atoms/Table'
import { USER_ROLES } from 'constants/users'
import { VISITS_STATUS } from 'constants/visits'
import { getFormattedDate } from 'utils/datePicker'
import { isEmpty } from 'utils/isEmpty'
import { handleTableSort } from 'utils/handleTableSort'
import { TEST_RESULT, SIZE_PER_PAGE } from './scheduleArchive.constants'
import Icons from '../../assets/icons'
import { deleteVisit } from '../VisitItem/visitItem.asyncActions'
import { selectCurrentUserHasPermissions } from '../../infrastructure/userContext/userContext.selectors'
import { actions } from './scheduleArchive.slice'
import { actions as action } from '../ScreeningDataDashboard/screeningDataDashboard.slice'
import { SCHEDULE_ARCHIVE_MODAL } from '../ScheduleArchiveModal/scheduleArchiveModal.constants'
import { SELECTED_MODAL } from '../ScreeningDataDashboard/screeningDataDashboard.constants'
import { dobFormatter } from '../../helpers/dobFormatter'
import { selectSchedulePatientDetailFilter } from './scheduleArchive.selectors'

const {
  setScheduleArchiveModal,
  saveSelectedPatient,
  setSchedulePatientDetailFilter,
} = actions

const { saveSelectedModal } = action

const SchedulePatientDetailTable = ({ scheduledPatientDetails }) => {
  const currentUserHasPermissions = useSelector(selectCurrentUserHasPermissions)
  const schedulePatientDetailFilters = useSelector(
    selectSchedulePatientDetailFilter
  )
  const isTestAdmin = currentUserHasPermissions([USER_ROLES.TEST_ADMIN])
  const dispatch = useDispatch()
  const [
    formattedScheduledPatientDetails,
    setFormattedScheduledPatientDetails,
  ] = useState(scheduledPatientDetails)
  const [tableFilters, setTableFilters] = useState({})

  const handleTableFilters = useCallback(
    ({ type, page, sizePerPage, sortField, searchText, sortOrder }) => {
      if (isEmpty(tableFilters)) {
        setFormattedScheduledPatientDetails(scheduledPatientDetails)
        dispatch(
          setSchedulePatientDetailFilter({
            page: 1,
            data: scheduledPatientDetails.slice(0, SIZE_PER_PAGE),
            limit: SIZE_PER_PAGE,
          })
        )
      } else {
        const currentPage = (page - 1) * sizePerPage
        const result = scheduledPatientDetails.filter(
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
          setFormattedScheduledPatientDetails(result)
          dispatch(
            setSchedulePatientDetailFilter({
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
            setSchedulePatientDetailFilter({
              page,
              data: sortField
                ? formattedData
                : formattedData.slice(currentPage, currentPage + sizePerPage),
              limit: sizePerPage,
            })
          )
        } else if (type === 'sort' && sortField !== null) {
          let formattedData = searchText ? result : scheduledPatientDetails
          formattedData = handleTableSort(
            formattedData,
            sortField,
            sortOrder,
            currentPage,
            sizePerPage
          )
          dispatch(
            setSchedulePatientDetailFilter({
              page,
              data: formattedData,
              limit: sizePerPage,
            })
          )
        } else {
          let formattedData = scheduledPatientDetails
          if (sortField !== null) {
            formattedData = handleTableSort(
              formattedData,
              sortField,
              sortOrder,
              currentPage,
              sizePerPage
            )
          }
          setFormattedScheduledPatientDetails(scheduledPatientDetails)
          dispatch(
            setSchedulePatientDetailFilter({
              page,
              data: sortField
                ? formattedData
                : scheduledPatientDetails.slice(
                    currentPage,
                    currentPage + sizePerPage
                  ),
              limit: sizePerPage,
            })
          )
        }
      }
    },
    [dispatch, scheduledPatientDetails, tableFilters]
  )

  useEffect(() => {
    return () => {
      dispatch(setSchedulePatientDetailFilter({}))
    }
  }, [dispatch])

  useEffect(() => {
    if (isEmpty(schedulePatientDetailFilters)) {
      dispatch(
        setSchedulePatientDetailFilter({
          page: 1,
          data:
            formattedScheduledPatientDetails &&
            formattedScheduledPatientDetails.slice(0, SIZE_PER_PAGE),
          limit: SIZE_PER_PAGE,
        })
      )
    }
  }, [dispatch, formattedScheduledPatientDetails, schedulePatientDetailFilters])

  useEffect(() => {
    handleTableFilters(tableFilters)
  }, [tableFilters, handleTableFilters])

  const statusFormatter = (status, row) => (
    <Badge
      variant={
        status === VISITS_STATUS.COMPLETED ||
        status === VISITS_STATUS.TEST_DENIED
          ? 'outline-success'
          : status === VISITS_STATUS.ENDED && !row.visitMetadata.testReport
          ? 'outline-danger'
          : 'outline-warning'
      }
      className='font-weight-bold badge-sm'
    >
      {status === VISITS_STATUS.ENDED && !row.visitMetadata.testReport
        ? 'Waiting For Result'
        : status === VISITS_STATUS.COMPLETED
        ? 'Visit Complete'
        : status}
    </Badge>
  )

  const actionFormatter = (testReport, row) => {
    if (testReport) {
      return (
        <div className='d-flex'>
          {isTestAdmin && (
            // PERMISSION:- Can add test results to the visit
            <Button variant='link' className='btn-auto p-0 mr-15'>
              <Image
                src={Icons.editIcon}
                width='18'
                alt='edit-icon'
                onClick={() => {
                  dispatch(
                    setScheduleArchiveModal(
                      SCHEDULE_ARCHIVE_MODAL.TEST_RESULT_MODAL
                    )
                  )
                  dispatch(saveSelectedModal(SELECTED_MODAL.EDIT_TEST_RESULT))
                  dispatch(saveSelectedPatient(row))
                }}
              />
            </Button>
          )}
          <Badge
            variant={
              testReport === TEST_RESULT.NEGATIVE
                ? 'outline-success'
                : 'outline-danger'
            }
            className={`font-weight-bold badge-sm btn-small`}
          >
            {testReport}
          </Badge>
        </div>
      )
    } else if (
      row.status === VISITS_STATUS.WAITING ||
      row.status === VISITS_STATUS.IN_PROGRESS
    ) {
      return (
        <div className='text-center'>
          <Button
            variant='link'
            className='align-item-right p-0 btn-block'
            onClick={() => dispatch(deleteVisit({ id: row.id }))}
          >
            <Image src={Icons.trashIcon} width='18' alt='trash-icon' />
          </Button>
        </div>
      )
      // PERMISSION:-Can add test results to the visit.
    } else if (row.status === VISITS_STATUS.ENDED && isTestAdmin) {
      return (
        <div className='text-center'>
          <Button
            variant='primary'
            className='btn-25 btn-block'
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
      formatter: (val, { dateOfBirth }) =>
        dobFormatter(getFormattedDate(val), dateOfBirth),
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
      text: 'Provider Status',
      formatter: statusFormatter,
      sort: true,
      sortCaret: SortingCustomIcon,
      formatExtraData: 'isDarkCaret',
      searchable: false,
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

  return (
    <PaginationProvider
      pagination={paginationFactory({
        custom: true,
        page: schedulePatientDetailFilters.page,
        sizePerPage: SIZE_PER_PAGE,
        totalSize: formattedScheduledPatientDetails.length,
        prePageText: 'Back',
        nextPageText: 'Next',
      })}
    >
      {({ paginationProps, paginationTableProps }) => (
        <ToolkitProvider
          keyField='id'
          data={scheduledPatientDetails}
          columns={columns}
          search
        >
          {({ searchProps, baseProps }) => (
            <>
              <Card className='overflow-hidden mb-30 border-none schedule-card'>
                <Card.Header className='schedule-modal m-4 md-mb-0'>
                  <Row className='align-items-center'>
                    <Col md={2} className='white-space-nowrap px-0'>
                      <h5 className='f-16 mb-0 lh-25 font-weight-bold'>
                        Total Scheduled Patients
                      </h5>
                    </Col>
                    <Col md={4}>
                      <Form.Control
                        type='text'
                        name='schedule-patient-detail'
                        className='search-control'
                        placeholder='Search Table'
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
                    data={schedulePatientDetailFilters.data || []}
                    onTableChange={onTableChange}
                    isWhiteBg={true}
                    isLightFont={true}
                    isRightAlign={true}
                  />
                </Card.Body>
              </Card>
              {formattedScheduledPatientDetails.length > 0 && (
                <PaginationListStandalone {...paginationProps} />
              )}
            </>
          )}
        </ToolkitProvider>
      )}
    </PaginationProvider>
  )
}

export default SchedulePatientDetailTable
