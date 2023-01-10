import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { PROVIDER_VISIT_TYPE } from 'constants/visits'
import Modal, { hideModal, showModal } from '../../widgets/modal'
import { actions } from '../VisitSession/visitSession.slice'
import { updateVisitSession } from '../VisitSession/visitSession.asyncActions'
import { actions as action } from '../Visits/visits.slice'
import { selectVisitSession } from '../VisitSession/visitSession.selectors'
import { SESSION_STATUS } from '../VisitSession/visitSession.constants'

const { setProviderVisit } = action
const { setVisitSessionModal } = actions

const ReleaseSessionModal = () => {
  const visitSession = useSelector(selectVisitSession)
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  const resetModal = () => dispatch(setVisitSessionModal(null))

  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])

  const handleClose = () => {
    dispatch(hideModal())
    resetModal()
  }
  const onReleaseVisit = () => {
    if (visitSession.status === SESSION_STATUS.IN_PROGRESS) {
      const updatedSession = { status: SESSION_STATUS.WAITING }
      dispatch(
        updateVisitSession({
          id: id,
          updatedSession,
        })
      ).then(() => {
        handleClose()
        router.push('/')
      })
      dispatch(setProviderVisit(PROVIDER_VISIT_TYPE.SCHEDULED_VISITS))
    } else {
      handleClose()
      router.push('/')
      dispatch(setProviderVisit(PROVIDER_VISIT_TYPE.SCHEDULED_VISITS))
    }
  }
  const footer = (
    <>
      <Button
        className='btn-lg'
        data-test='release-session-modal-button'
        variant='warning'
        onClick={onReleaseVisit}
      >
        Release Session
      </Button>
      <Button className='btn-small' variant='light' onClick={handleClose}>
        Cancel
      </Button>
    </>
  )
  return (
    <>
      <Modal
        title='Are You Sure You Want to Release the Session?'
        reset={resetModal}
        footer={footer}
        size='sm'
      >
        <p className='f-14 mb-30'>
          Releasing the session will put the group of patients back in the
          waiting queue, and will give other providers the opportunity to claim
          the session for themselves.
        </p>
      </Modal>
    </>
  )
}

export default ReleaseSessionModal
