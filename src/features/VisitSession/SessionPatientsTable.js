import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Badge, Card, Row, Col, Form, Image } from 'react-bootstrap'
import { useRouter } from 'next/router'
import ToolkitProvider from 'react-bootstrap-table2-toolkit'
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from 'react-bootstrap-table2-paginator'
import { Table, SortingCustomIcon } from 'components/atoms/Table'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { VISITS_STATUS } from 'constants/visits'
import { convertDateToUTC, getCsvFormattedDate } from 'utils/datePicker'
import { isEmpty } from 'utils/isEmpty'
import { getFormattedTime } from 'utils/getFormattedTime'
import { customTableSort } from 'utils/customTableSort'
import { isEqual } from 'utils/isEqual'
import { handleTableSort } from 'utils/handleTableSort'
import { TEST_RESULT } from '../ScheduleArchive/scheduleArchive.constants'
import {
  selectVisitSession,
  selectSessionFilters,
} from './visitSession.selectors'
import { actions } from './visitSession.slice'
import IMAGES from '../../assets/images'
import { updateVisit } from '../VisitItem/visitItem.asyncActions'
import { dobFormatter } from '../../helpers/dobFormatter'
import { getNamedBusyIndicator } from '../../widgets/busyIndicator/busyIndicator.selectors'
import VisitsTableSkeleton from '../Skeleton/VisitsTableSkeleton'
import { fetchVisitSession } from './visitSession.asyncActions'

const SIZE_PER_PAGE = 10
const FILE_NAME = 'SessionPatientLog.csv'
const WAITING_FOR_RESULT = 'Waiting For Result'
const { saveSelectedSessionVisit, setSessionFilters } = actions

const SessionPatientsTable = () => {
  const router = useRouter()
  const visitSession = useSelector(selectVisitSession)
  const sessionFilters = useSelector(selectSessionFilters)
  const { id } = router.query
  const dispatch = useDispatch()
  const show = useSelector(
    getNamedBusyIndicator(BUSY_INDICATOR_NAME.FETCH_VISIT_SESSION)
  )
  const visits = visitSession.visits
  const [filteredVisits, setFilteredVisits] = useState([])
  const [searchResultSize, setSearchResultSize] = useState(0)

  const fullNameFormatter = (visit) => `${visit.firstName} ${visit.lastName}`

  const formattedVisits = visits.map((visit) => ({
    ...visit,
    fullName: fullNameFormatter(visit),
  }))

  useEffect(() => {
    dispatch(fetchVisitSession(id))
  }, [dispatch, id])

  useEffect(() => {
    if (!isEqual(formattedVisits, filteredVisits)) {
      dispatch(
        setSessionFilters({
          page: isEmpty(sessionFilters) ? 1 : sessionFilters.page,
          data: formattedVisits && formattedVisits.slice(0, SIZE_PER_PAGE),
          limit: SIZE_PER_PAGE,
        })
      )
      setFilteredVisits(formattedVisits)
    }
  }, [dispatch, formattedVisits, sessionFilters, filteredVisits])

  useEffect(() => {
    return () => {
      dispatch(setSessionFilters({}))
    }
  }, [dispatch])

  const isWaiting = (status) => status === VISITS_STATUS.WAITING
  const isCompleted = (status) => status === VISITS_STATUS.COMPLETED
  const isEnded = (status) => status === VISITS_STATUS.ENDED
  const isAbsent = (status) => status === VISITS_STATUS.ABSENT
  const isInProgress = (status) => status === VISITS_STATUS.IN_PROGRESS
  const isWaitingForResult = (status) => status === WAITING_FOR_RESULT

  const handleClick = (id, row) => {
    const { status, visitMetadata } = row
    if (isWaiting(status)) {
      const visitDate = new Date()
      const updatedVisit = {
        status: VISITS_STATUS.IN_PROGRESS,
        visitMetadata: {
          ...visitMetadata,
          visitTime: getFormattedTime(visitDate),
        },
      }
      dispatch(updateVisit({ visitId: id, updatedVisit })).then(() => {
        dispatch(saveSelectedSessionVisit(row))
        router.push(`/visit/${id}`)
      })
    } else {
      dispatch(saveSelectedSessionVisit(row))
      router.push(`/visit/${id}`)
    }
  }

  const getFormattedStatus = (status, row) => {
    const { patientNotified, documentedEmr, testReport } = row.visitMetadata
    let formattedStatus = status
    if (isCompleted(status)) {
      formattedStatus = 'Visit Complete'
    } else if (isWaiting(status)) {
      formattedStatus = VISITS_STATUS.WAITING
    } else if (isEnded(status)) {
      if (!patientNotified && !documentedEmr && testReport) {
        formattedStatus = 'Attention Required'
      } else if (!testReport) {
        formattedStatus = WAITING_FOR_RESULT
      }
    }
    return formattedStatus
  }

  const statusFormatter = (status, row) => {
    const { testReport } = row
    const formattedStatus = getFormattedStatus(status, row)
    const classStatus = isWaitingForResult(formattedStatus)
      ? 'e2e-waiting-for-result'
      : ''

    return (
      <Badge
        variant={
          isCompleted(status)
            ? 'outline-success'
            : isWaiting(status) ||
              (isEnded(status) && !testReport) ||
              isInProgress(status)
            ? 'outline-warning'
            : 'outline-danger'
        }
        className={`font-weight-bold badge-sm ${classStatus}`}
      >
        {formattedStatus}
      </Badge>
    )
  }
  // test
  const booleanFormatter = (bool) => (bool ? 'Yes' : bool === false ? 'No' : '')

  const testReportFormatter = (testReport) => {
    return (
      testReport && (
        <Badge
          variant={
            testReport === TEST_RESULT.POSITIVE
              ? 'outline-danger'
              : 'outline-success'
          }
          className={`font-weight-bold badge-sm btn-small e2e-patient-report-${testReport?.toLowerCase()}`}
        >
          {testReport}
        </Badge>
      )
    )
  }

  const actionsFormatter = (id, row, index) => {
    const { visitMetadata, status } = row
    const { testReport, patientNotified, documentedEmr } = visitMetadata
    return (
      <div className='text-center'>
        {!isAbsent(status) && (
          <Button
            variant={
              isWaiting(status)
                ? 'primary'
                : isEnded(status) &&
                  !patientNotified &&
                  !documentedEmr &&
                  testReport
                ? 'danger'
                : 'light'
            }
            className={`btn-25 pendo-session-visit-button e2e-session-visit-button-${index}`}
            onClick={() => handleClick(id, row)}
          >
            {isWaiting(status)
              ? 'Start Visit'
              : isEnded(status) &&
                testReport &&
                !patientNotified &&
                !documentedEmr
              ? 'Complete Visit'
              : 'View Visit'}
          </Button>
        )}
      </div>
    )
  }

  const columns = [
    {
      dataField: 'fullName',
      text: 'Full Name',
      sort: true,
      sortCaret: SortingCustomIcon,
      formatExtraData: 'isDarkCaret',
      sortFunc: (
        a,
        b,
        order,
        datafield,
        { patient: { firstName: rowAFirstName, lastName: rowALastName } },
        { patient: { firstName: rowBFirstName, lastName: rowBLastName } }
      ) => {
        const rowAFullName = `${rowAFirstName} ${rowALastName}`
        const rowBFullName = `${rowBFirstName} ${rowBLastName}`
        return customTableSort(rowAFullName, rowBFullName, order)
      },
    },
    {
      dataField: 'dob',
      text: 'DOB',
      sort: true,
      formatter: (cell, row) =>
        dobFormatter(convertDateToUTC(row.dateOfBirth), row.dateOfBirth),
      sortCaret: SortingCustomIcon,
      formatExtraData: 'isDarkCaret',
      sortFunc: (
        a,
        b,
        order,
        datafield,
        { patient: { dateOfBirth: rowADateOfBirth } },
        { patient: { dateOfBirth: rowBDateOfBirth } }
      ) => {
        return customTableSort(rowADateOfBirth, rowBDateOfBirth, order)
      },
      searchable: false,
      csvFormatter: (cell, row) => getCsvFormattedDate(row.dateOfBirth),
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
      searchable: false,
      csvFormatter: getFormattedStatus,
    },
    {
      dataField: 'visitMetadata.patientNotified',
      text: 'Notified',
      formatter: booleanFormatter,
      sort: true,
      sortCaret: SortingCustomIcon,
      formatExtraData: 'isDarkCaret',
      searchable: false,
      csvFormatter: booleanFormatter,
    },
    {
      dataField: 'visitMetadata.documentedEmr',
      text: 'Documented',
      formatter: booleanFormatter,
      sort: true,
      sortCaret: SortingCustomIcon,
      formatExtraData: 'isDarkCaret',
      searchable: false,
      csvFormatter: booleanFormatter,
    },
    {
      dataField: 'visitMetadata.testReport',
      text: 'Result',
      formatter: testReportFormatter,
      sort: true,
      sortCaret: SortingCustomIcon,
      formatExtraData: 'isDarkCaret',
      searchable: false,
      csvFormatter: (cell) => cell || '',
    },
    {
      dataField: 'id',
      text: 'Actions',
      formatter: actionsFormatter,
      searchable: false,
      csvExport: false,
    },
  ]

  const onTableChange = (
    type,
    { page, sizePerPage, searchText, sortField, sortOrder }
  ) => {
    let currentPage = (page - 1) * sizePerPage
    const result = formattedVisits.filter((each) =>
      each.fullName.toLowerCase().startsWith(searchText.toLowerCase())
    )
    if (type === 'search') {
      let formattedData = result
      if (sortField !== null) {
        formattedData = handleTableSort(
          formattedData,
          sortField,
          sortOrder,
          (currentPage = 0),
          sizePerPage
        )
      }
      setSearchResultSize(result.length)
      dispatch(
        setSessionFilters({
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
        setSessionFilters({
          page: page,
          data: sortField
            ? formattedData
            : formattedData.slice(currentPage, currentPage + sizePerPage),
          limit: sizePerPage,
        })
      )
    } else if (type === 'sort' && sortField !== null) {
      let formattedData = searchText ? result : formattedVisits
      formattedData = handleTableSort(
        formattedData,
        sortField,
        sortOrder,
        currentPage,
        sizePerPage
      )
      dispatch(
        setSessionFilters({
          page: page,
          data: formattedData,
          limit: sizePerPage,
        })
      )
    } else {
      let formattedData = formattedVisits
      if (sortField !== null) {
        formattedData = handleTableSort(
          formattedData,
          sortField,
          sortOrder,
          currentPage,
          sizePerPage
        )
      }
      setFilteredVisits(formattedVisits)
      dispatch(
        setSessionFilters({
          page: page,
          data: sortField
            ? formattedData
            : formattedVisits.slice(currentPage, currentPage + sizePerPage),
          limit: sizePerPage,
        })
      )
    }
  }

  return show ? (
    <VisitsTableSkeleton columns={7} />
  ) : (
    <>
      <SessionPatientsTablePagination
        columns={columns}
        data={sessionFilters.data || []}
        page={sessionFilters.page}
        sizePerPage={10}
        onTableChange={onTableChange}
        totalSize={searchResultSize || filteredVisits.length}
      />
    </>
  )
}

const SessionPatientsTablePagination = ({
  data,
  page,
  sizePerPage,
  totalSize,
  columns,
  onTableChange,
}) => (
  <PaginationProvider
    pagination={paginationFactory({
      custom: true,
      page,
      sizePerPage,
      totalSize,
      prePageText: 'Back',
      nextPageText: 'Next',
    })}
  >
    {({ paginationProps, paginationTableProps }) => (
      <ToolkitProvider
        data={data}
        columns={columns}
        search
        exportCSV={{ fileName: FILE_NAME }}
      >
        {({ baseProps, searchProps, csvProps }) => (
          <>
            <Card className='overflow-hidden mb-30 border-none'>
              <Card.Header className='bg-white border-0 p-20 pb-15'>
                <Row>
                  <Col md={8} className='white-space-nowrap'>
                    <div className='d-md-flex align-items-center'>
                      <h4 className='f-16 font-weight-bold mb-0 lh-40 md-md-0'>
                        Patients in Session
                      </h4>
                      <div className='px-30 pendo-session-patient-search'>
                        <Form.Control
                          type='text'
                          name='submission-by-locataion'
                          className='search-control'
                          placeholder='Search'
                          value={searchProps.searchText}
                          onChange={(ev) =>
                            searchProps.onSearch(ev.target.value)
                          }
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md={4} className='px-30'>
                    <Button
                      variant='link'
                      className='btn-auto p-0 float-right'
                      onClick={() => csvProps.onExport()}
                    >
                      <Image src={IMAGES.download} alt='download' width='20' />
                    </Button>
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
                  data={data}
                  onTableChange={onTableChange}
                  isWhiteBg={true}
                  isLightFont={true}
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

export default SessionPatientsTable
