import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Card, Form } from 'react-bootstrap'
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from 'react-bootstrap-table2-paginator'
import { Table } from 'components/atoms/Table'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import ToolkitProvider from 'react-bootstrap-table2-toolkit'
import ScreeningTableSkeleton from '../Skeleton/ScreeningTableSkeleton'
import { getNamedBusyIndicator } from '../../widgets/busyIndicator/busyIndicator.selectors'
import { actions } from './screeningDataDashboard.slice'
import { fetchScreeningExport } from './screeningDataDashboard.asyncActions'
import { selectDashboardFilters } from './screeningDataDashboard.selectors'

const { setSubmissionFilters } = actions
const FILE_NAME = 'TotalSubmission.csv'
const ENTER_KEY = 13

const Pagination = ({
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
  columns,
}) => {
  const isBusyIndicatorActive = useSelector(
    getNamedBusyIndicator(BUSY_INDICATOR_NAME.FETCH_SCREENING_REPORTS)
  )
  const [studentName, setStudentName] = useState('')
  const dashboardFilters = useSelector(selectDashboardFilters)
  const dispatch = useDispatch()

  const MyExportCSV = (props) => {
    return (
      <Button
        variant='dark'
        onClick={() => dispatch(fetchScreeningExport(dashboardFilters))}
        className='btn-small'
      >
        Export
      </Button>
    )
  }

  const handleSearchChange = (ev) => {
    const value = ev.target.value
    setStudentName(value)

    // This need to be updated, once we have clarity how to remove the search criteria
    if (!value)
      dispatch(
        setSubmissionFilters({
          name: value,
          page: 1,
        })
      )
  }

  const handleKeyPress = (target) => {
    if (target.charCode === ENTER_KEY) {
      if (studentName) {
        dispatch(
          setSubmissionFilters({
            name: studentName,
            page: 1,
          })
        )
      }
    }
  }

  const handleSearchClick = () => {
    if (studentName) {
      dispatch(
        setSubmissionFilters({
          name: studentName,
          page: 1,
        })
      )
    }
  }

  return (
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
          keyField='id'
          data={data}
          columns={columns}
          exportCSV={{ fileName: FILE_NAME }}
        >
          {(props) => (
            <>
              <Card className='border-dark overflow-hidden mb-30'>
                <div className='card-header bg-primary border-0'>
                  <Row>
                    <Col md={5}>
                      <div className='d-flex'>
                        <h4 className='f-16 font-weight-bold text-white mb-0 lh-40 mr-20'>
                          Total Submissions
                        </h4>
                        <MyExportCSV {...props.csvProps} />
                      </div>
                    </Col>
                    <Col md={7} lg={4} xl={3} className='ml-auto'>
                      <div className='position-relative'>
                        <Button
                          className='p-0 btn-auto search-btn position-absolute'
                          variant='link'
                          onClick={handleSearchClick}
                        />
                        <Form.Control
                          type='text'
                          name='total-submission-search'
                          placeholder='Search by Name'
                          value={studentName}
                          onChange={handleSearchChange}
                          onKeyPress={handleKeyPress}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
                <Table
                  {...paginationTableProps}
                  {...props.baseProps}
                  remote={{ sort: true, pagination: true }}
                  keyField='id'
                  data={data}
                  columns={columns}
                  isRoundedBorder={true}
                  onTableChange={onTableChange}
                  isLightFont={true}
                  noDataIndication={
                    isBusyIndicatorActive && (
                      <ScreeningTableSkeleton columns={9} />
                    )
                  }
                />
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
export default Pagination
