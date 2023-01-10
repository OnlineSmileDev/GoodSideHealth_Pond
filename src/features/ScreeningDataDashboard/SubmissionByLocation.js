import React from 'react'
import { useSelector } from 'react-redux'
import { Card, Form, Row, Col, Button } from 'react-bootstrap'
import ToolkitProvider from 'react-bootstrap-table2-toolkit'
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from 'react-bootstrap-table2-paginator'
import { Table, SortingCustomIcon } from 'components/atoms/Table'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { selectScreeningLocationSubmission } from './screeningDataDashboard.selectors'
import { getNamedBusyIndicator } from '../../widgets/busyIndicator/busyIndicator.selectors'
import ScreeningTableSkeleton from '../Skeleton/ScreeningTableSkeleton'
import { usePrevious } from '../../hooks'

const ENTER_KEY = 13

const SubmissionByLocation = () => {
  const locationSubmission = useSelector(selectScreeningLocationSubmission)
  const columns = [
    {
      dataField: 'location',
      text: 'Location Name',
      sort: true,
      sortCaret: SortingCustomIcon,
    },
    {
      dataField: 'symptomCount',
      text: 'Symptom Count',
      sort: true,
      sortCaret: SortingCustomIcon,
    },
    {
      dataField: 'exposureCount',
      text: 'Exposure Count',
      sort: true,
      sortCaret: SortingCustomIcon,
    },
    {
      dataField: 'totalCount',
      text: 'Total Count',
      sort: true,
      sortCaret: SortingCustomIcon,
    },
    {
      dataField: 'totalSubmissions',
      text: 'Total Submissions',
      sort: true,
      sortCaret: SortingCustomIcon,
    },
  ]

  const defaultSorted = [
    {
      dataField: 'location',
      order: 'asc',
    },
  ]

  return (
    <>
      <SubmissionByLocationPagination
        columns={columns}
        data={locationSubmission}
        sizePerPage={5}
        totalSize={locationSubmission.length}
        isRoundedBorder={true}
        defaultSorted={defaultSorted}
      />
    </>
  )
}

const SubmissionByLocationPagination = ({
  data,
  page,
  sizePerPage,
  totalSize,
  columns,
  isRoundedBorder,
  defaultSorted,
}) => {
  const SubmissionByLocationSearch = (props) => {
    let input
    const { data, onClear, onSearch } = props
    // TODO: Really unfortunate to be using this pattern, highly open to change again
    // TODO: Tried combing through the table api and couldnt find a cleaner way to do this, but i think its just because i am new to using this module
    const previousDataLocation = usePrevious(data?.[0]?.location)
    React.useEffect(() => {
      if (previousDataLocation !== data?.[0]?.length) {
        onClear()
      }
    }, [previousDataLocation, data, onClear])

    const handleSearchClick = () => {
      onSearch(input.value)
    }
    const handleSearchChange = (e) => {
      if (!input.value) {
        onSearch(input.value)
      }
    }
    const handleKeyPress = (target) => {
      if (target.charCode === ENTER_KEY) {
        onSearch(input.value)
      }
    }
    return (
      <>
        <Button
          className='p-0 btn-auto search-btn position-absolute ml-3'
          variant='link'
          onClick={handleSearchClick}
        />
        <Form.Control
          type='text'
          name='total-submission-search'
          placeholder='Search'
          ref={(n) => (input = n)}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
        />
      </>
    )
  }
  const isBusyIndicatorActive = useSelector(
    getNamedBusyIndicator(BUSY_INDICATOR_NAME.FETCH_SCREENING_REPORTS)
  )

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
        <ToolkitProvider data={data} columns={columns} search>
          {(props) => (
            <>
              <Card className='border-dark overflow-hidden mb-30'>
                <Card.Header className='bg-primary border-0 p-20 pb-15'>
                  <Row>
                    <Col md={5}>
                      <h4 className='f-16 font-weight-bold text-white mb-0 lh-40'>
                        Submissions by Location
                      </h4>
                    </Col>
                    <Col md={7} lg={7} xl={5} className='ml-auto'>
                      <SubmissionByLocationSearch
                        data={data}
                        {...props.searchProps}
                      />
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body className='p-0'>
                  {isBusyIndicatorActive ? (
                    <ScreeningTableSkeleton columns={5} />
                  ) : (
                    <Table
                      {...paginationTableProps}
                      {...props.baseProps}
                      keyField='id'
                      columns={columns}
                      data={data}
                      isRoundedBorder={isRoundedBorder}
                      defaultSorted={defaultSorted}
                      isLightFont={true}
                    />
                  )}
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

export default SubmissionByLocation
