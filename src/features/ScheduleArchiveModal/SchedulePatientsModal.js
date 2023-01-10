import React, { useEffect } from 'react'
import SchedulePatientDetailTable from '../ScheduleArchive/SchedulePatientDetailTable'
import { useSelector, useDispatch } from 'react-redux'
import Modal, { showModal } from '../../widgets/modal'
import { Button, Row, Col } from 'react-bootstrap'
import { actions } from '../ScheduleArchive/scheduleArchive.slice'
import { selectSchedulePatients } from '../ScheduleArchive/scheduleArchive.selectors'

const { setScheduleArchiveModal } = actions

const SchedulePatientsModal = () => {
  const schedulePatients = useSelector(selectSchedulePatients)

  const dispatch = useDispatch()
  const resetModal = () => dispatch(setScheduleArchiveModal(null))

  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])

  const footer = (
    <Row className='btn-block'>
      <Col lg={4} md={4} className='px-0'>
        <Button variant='primary' className='btn-block'>
          Export CSV
        </Button>
      </Col>
    </Row>
  )

  return (
    <>
      <Modal
        reset={resetModal}
        isFullWidth={true}
        isFullHeader={true}
        footer={footer}
        size='xl'
      >
        <SchedulePatientDetailTable
          scheduledPatientDetails={schedulePatients.visits}
        />
      </Modal>
    </>
  )
}

export default SchedulePatientsModal
