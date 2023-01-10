import React, { useEffect } from 'react'
import { Table, SortingCustomIcon } from 'components/atoms/Table'
import ModalFooter from 'components/molecules/ModalFooter'
import { convertDateToUTCWithFullMonth } from 'utils/datePicker'
import { getFormattedTime } from 'utils/getFormattedTime'
import { BUTTON_VARIANT } from 'components/atoms/Button'
import Modal, { hideModal, showModal } from '../../widgets/modal'
import { actions } from '../VisitItem/visitItem.slice'
import { selectVisitActivities } from '../VisitItem/visitItem.selectors'
import { useDispatch, useSelector } from 'react-redux'
import ToolkitProvider from 'react-bootstrap-table2-toolkit'

const { setSelectedVisitItemModal } = actions
const FILE_NAME = 'VisitActivityLog.csv'
const columns = [
  {
    dataField: 'time',
    text: 'Time',
    sort: true,
    sortCaret: SortingCustomIcon,
  },
  {
    dataField: 'date',
    text: 'Date',
    sort: true,
    sortCaret: SortingCustomIcon,
  },
  {
    dataField: 'description',
    text: 'Description',
    sort: true,
    sortCaret: SortingCustomIcon,
  },
  {
    dataField: 'userName',
    text: 'User',
    sort: true,
    sortCaret: SortingCustomIcon,
  },
]

const getSortedVisitActivities = (visits) =>
  visits.sort(
    (firstVisit, secondVisit) =>
      new Date(firstVisit.createdAt) - new Date(secondVisit.createdAt)
  )

const VisitActivityModal = () => {
  const dispatch = useDispatch()
  const resetModal = () => dispatch(setSelectedVisitItemModal(null))
  const visitActivities = useSelector(selectVisitActivities)
  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])

  const handleClose = () => {
    dispatch(hideModal())
    resetModal()
  }

  const formattedVisitActivities =
    visitActivities &&
    visitActivities.map((each) => {
      const { id, createdAt, description, firstName, lastName } = each
      const date = convertDateToUTCWithFullMonth(createdAt)
      const time = getFormattedTime(createdAt)
      const userName = `${firstName} ${lastName}`
      return { id, date, userName, time, description, createdAt }
    })

  const footer = (props) => (
    <ModalFooter
      submitButtonProps={{
        onClick: () => {
          props.csvProps.onExport()
          handleClose()
        },
        buttonText: 'Export CSV',
        variant: BUTTON_VARIANT.PRIMARY,
      }}
      cancelButtonProps={{
        onClick: handleClose,
      }}
    />
  )

  return (
    <ToolkitProvider
      bordered={false}
      keyField='id'
      data={getSortedVisitActivities(formattedVisitActivities)}
      columns={columns}
      exportCSV={{ fileName: FILE_NAME }}
    >
      {(props) => (
        <Modal title='Visit Activity' reset={resetModal} footer={footer(props)}>
          <div className='scrollbar border-4 scroll-thead-primary'>
            <Table {...props.baseProps} />
          </div>
        </Modal>
      )}
    </ToolkitProvider>
  )
}
export default VisitActivityModal
