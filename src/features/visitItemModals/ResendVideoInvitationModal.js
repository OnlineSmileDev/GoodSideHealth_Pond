import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalFooter from 'components/molecules/ModalFooter'
import { BUTTON_VARIANT } from 'components/atoms/Button'
import Modal, { hideModal, showModal } from '../../widgets/modal'
import { actions } from '../VisitItem/visitItem.slice'
import { selectSelectedInvitation } from '../VisitItem/visitItem.selectors'
import { createVideoInvitation } from '../VisitItem/visitItem.asyncActions'
import { withFeature } from 'flagged'

const { setSelectedVisitItemModal } = actions

const ResendVideoInvitationModal = () => {
  const dispatch = useDispatch()
  const resetModal = () => dispatch(setSelectedVisitItemModal(null))
  const { id, type, name, invitee, videoCallId } = useSelector(
    selectSelectedInvitation
  )

  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])

  const handleClose = () => {
    dispatch(hideModal())
    resetModal()
  }
  const onResendInvitation = () => {
    const videoInvitation = { id, type, name, invitee, videoCallId }
    dispatch(createVideoInvitation({ videoInvitation })).then((res) =>
      handleClose()
    )
  }

  const footer = (
    <ModalFooter
      submitButtonProps={{
        onClick: onResendInvitation,
        buttonText: 'Resend Invitation',
        variant: BUTTON_VARIANT.PRIMARY,
      }}
      cancelButtonProps={{ onClick: handleClose }}
    />
  )

  return (
    <Modal
      title='Do you want to resend this invitation?'
      reset={resetModal}
      footer={footer}
      size='sm'
    >
      <p className='f-14 mb-30'>
        This user will recieve new link for this video session.
      </p>
    </Modal>
  )
}
export default withFeature('videoInvitation')(ResendVideoInvitationModal)
