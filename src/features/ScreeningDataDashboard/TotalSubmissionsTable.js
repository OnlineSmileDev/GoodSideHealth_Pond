import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SortingCustomIcon } from 'components/atoms/Table'
import { getFormattedDate, getCsvFormattedDate } from 'utils/datePicker'
import TablePagination from './TablePagination'
import {
  selectScreeningReport,
  selectSubmissionFilters,
  selectDashboardFilters,
} from './screeningDataDashboard.selectors'
import { actions } from './screeningDataDashboard.slice'
import { fetchScreeningReports } from './screeningDataDashboard.asyncActions'
import { RECORDS_PER_PAGE } from './screeningDataDashboard.constants'

const { setSubmissionFilters } = actions

const TotalSubmissionsTable = () => {
  const screeningReport = useSelector(selectScreeningReport)
  const submissionFilter = useSelector(selectSubmissionFilters)
  const dashboardFilters = useSelector(selectDashboardFilters)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      fetchScreeningReports({ ...dashboardFilters, ...submissionFilter })
    )
  }, [dispatch, dashboardFilters, submissionFilter])

  const handleTableChange = (
    type,
    { sortField, sortOrder, page, sizePerPage }
  ) => {
    if (sortField !== null) {
      dispatch(
        setSubmissionFilters({
          sort: sortField,
          order: sortOrder,
        })
      )
    }
    if (type === 'pagination')
      dispatch(
        setSubmissionFilters({
          page,
          limit: sizePerPage,
        })
      )
  }

  const dateFormatter = (date) => getFormattedDate(date)

  const booleanFormatter = (value) => (value ? 'Yes' : 'No')

  const columns = [
    {
      dataField: 'createdAt',
      text: 'Submission Date',
      sort: true,
      sortCaret: SortingCustomIcon,
      formatter: dateFormatter,
    },
    {
      dataField: 'location',
      text: 'Location Name',
      sort: true,
      sortCaret: SortingCustomIcon,
    },
    {
      dataField: 'grade',
      text: 'Grade/Dept',
      sort: true,
      sortCaret: SortingCustomIcon,
    },
    {
      dataField: 'dateOfBirth',
      text: 'Birthday',
      sort: true,
      sortCaret: SortingCustomIcon,
      formatter: dateFormatter,
      csvFormatter: getCsvFormattedDate,
    },
    {
      dataField: 'lastName',
      text: 'Last Name',
      sort: true,
      sortCaret: SortingCustomIcon,
    },
    {
      dataField: 'firstName',
      text: 'First Name',
      sort: true,
      sortCaret: SortingCustomIcon,
    },
    {
      dataField: 'studentId', // TODO - we are getting schoolId here
      text: 'Employee ID',
      sort: true,
      sortCaret: SortingCustomIcon,
    },
    {
      dataField: 'symptoms',
      text: 'Symptoms',
      sort: true,
      sortCaret: SortingCustomIcon,
      formatter: booleanFormatter,
    },
    {
      dataField: 'exposure',
      text: 'Exposure',
      sort: true,
      sortCaret: SortingCustomIcon,
      formatter: booleanFormatter,
    },
  ]

  return (
    <TablePagination
      columns={columns}
      data={screeningReport.data}
      sizePerPage={RECORDS_PER_PAGE.TOTAL_SUBMISSION}
      onTableChange={handleTableChange}
      totalSize={screeningReport.meta.totalItems}
      page={submissionFilter.page}
    />
  )
}

export default TotalSubmissionsTable
