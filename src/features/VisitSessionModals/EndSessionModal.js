import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { Table, SortingCustomIcon } from 'components/atoms/Table'
import { PROVIDER_VISIT_TYPE } from 'constants/visits'
import { getFormattedDate } from 'utils/datePicker'
import Modal, { hideModal, showModal } from '../../widgets/modal'
import { selectVisitSession } from '../VisitSession/visitSession.selectors'
import { updateVisitSession } from '../VisitSession/visitSession.asyncActions'
import { actions } from '../VisitSession/visitSession.slice'
import { actions as action } from '../Visits/visits.slice'
import { dobFormatter } from '../../helpers/dobFormatter'
import { SESSION_STATUS } from '../VisitSession/visitSession.constants'

const { setProviderVisit } = action
const { setVisitSessionModal } = actions

const EndSessionModal = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  const visitSession = useSelector(selectVisitSession)
  const resetModal = () => dispatch(setVisitSessionModal(null))

  const totalWaitingPatients = visitSession.visits.filter(
    (each) => each.status === 'Waiting'
  )
  const fullNameFormatter = (fullName, row) =>
    `${row.firstName} ${row.lastName}`

  const columns = [
    {
      dataField: 'fullName',
      text: 'Full Name',
      formatter: fullNameFormatter,
      sort: true,
      sortCaret: SortingCustomIcon,
      formatExtraData: 'isDarkCaret',
    },
    {
      dataField: 'dob',
      text: 'DOB',
      sort: true,
      formatter: (cell, row) =>
        dobFormatter(getFormattedDate(row.dateOfBirth), row.dateOfBirth),
      sortCaret: SortingCustomIcon,
      formatExtraData: 'isDarkCaret',
    },
    {
      dataField: 'id',
      text: 'ID',
      sort: true,
      sortCaret: SortingCustomIcon,
      formatExtraData: 'isDarkCaret',
    },
  ]

  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])

  const handleClose = () => {
    dispatch(hideModal())
    resetModal()
  }

  const onEndVisit = () => {
    const updatedSession = { status: SESSION_STATUS.ENDED }
    dispatch(updateVisitSession({ id: id, updatedSession })).then(() => {
      handleClose()
      router.push('/')
    })
    dispatch(setProviderVisit(PROVIDER_VISIT_TYPE.SCHEDULED_VISITS))
  }

  const footer = (
    <>
      <Button className='btn-lg' variant='warning' onClick={onEndVisit}>
        End Session
      </Button>
      <Button className='btn-small' variant='light' onClick={handleClose}>
        Cancel
      </Button>
    </>
  )
  return (
    <>
      <Modal
        title='Are You Sure You Want to End the Session?'
        reset={resetModal}
        footer={footer}
        size='sm'
      >
        <>
          <p className='f-14 mb-30'>
            Ending this session will prevent you from beginning any new visits
            in the session. The following patients will be marked as absent from
            the session:
          </p>
          <div className='scrollbar'>
            <Table
              keyField='id'
              columns={columns}
              data={totalWaitingPatients}
              isWhiteBg={true}
              isLightFont={true}
            />
          </div>
        </>
      </Modal>
    </>
  )
}

export default EndSessionModal
