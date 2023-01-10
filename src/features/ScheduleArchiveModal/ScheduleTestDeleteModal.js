import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal, { showModal, hideModal } from '../../widgets/modal'
import { Button } from 'react-bootstrap'
import { actions } from '../ScheduleArchive/scheduleArchive.slice'
import {
  deleteTest,
  deleteRecurringSession,
} from '../ScheduleArchive/scheduleArchive.asyncActions'
import { selectSelectedSession } from '../ScheduleArchive/scheduleArchive.selectors'

const { setScheduleArchiveModal } = actions

const ScheduleTestDeleteModal = () => {
  const dispatch = useDispatch()
  const resetModal = () => dispatch(setScheduleArchiveModal(null))
  const selectedSession = useSelector(selectSelectedSession)

  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])

  const handleClose = () => {
    dispatch(hideModal())
    resetModal()
  }

  const handleRecurringScheduleDelete = () =>
    dispatch(
      deleteRecurringSession({
        id: selectedSession.appointmentId,
        allFuture: true,
      })
    ).then((res) => {
      if (res.payload) resetModal()
    })

  const footer = (
    <>
      <Button
        className='hind'
        variant='danger'
        onClick={() =>
          dispatch(
            deleteTest({
              id: selectedSession.id,
            })
          ).then((res) => {
            if (res.payload) resetModal()
          })
        }
      >
        Delete This Appointment
      </Button>
      <Button
        className='hind'
        variant='danger'
        onClick={handleRecurringScheduleDelete}
      >
        Delete This Appointment and Following Appointments
      </Button>
      <Button
        className='btn-small hind ml-auto mr-0 '
        variant='light'
        onClick={handleClose}
      >
        Cancel
      </Button>
    </>
  )

  return (
    <>
      <Modal title='Delete Test' reset={resetModal} footer={footer}>
        <p className='test-light f-14 mb-20'>
          This action cannot be undone. Please select the delete option below
        </p>
      </Modal>
    </>
  )
}

export default ScheduleTestDeleteModal
