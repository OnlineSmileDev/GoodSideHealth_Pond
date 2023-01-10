import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalFooter from 'components/molecules/ModalFooter'
import { BUTTON_VARIANT } from 'components/atoms/Button'
import Modal, { hideModal, showModal } from '../../widgets/modal'
import { actions } from '../VisitItem/visitItem.slice'
import { selectSelectedInvitation } from '../VisitItem/visitItem.selectors'
import { deleteVideoInvitation } from '../VisitItem/visitItem.asyncActions'
import { withFeature } from 'flagged'

const { setSelectedVisitItemModal } = actions

const DeleteVideoInvitationModal = () => {
  const dispatch = useDispatch()
  const resetModal = () => dispatch(setSelectedVisitItemModal(null))
  const { id } = useSelector(selectSelectedInvitation)

  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])

  const handleClose = () => {
    dispatch(hideModal())
    resetModal()
  }
  const onRemoveUser = () => {
    dispatch(deleteVideoInvitation({ id })).then((res) => handleClose())
  }

  const footer = (
    <ModalFooter
      submitButtonProps={{
        onClick: onRemoveUser,
        buttonText: 'Remove User',
        variant: BUTTON_VARIANT.DANGER,
      }}
      cancelButtonProps={{ onClick: handleClose }}
    />
  )

  return (
    <Modal
      title='Are You Sure You Want to Remove This User?'
      reset={resetModal}
      footer={footer}
      size='sm'
    >
      <p className='f-14 mb-30'>
        This user will be removed from this video session.
      </p>
    </Modal>
  )
}
export default withFeature('videoInvitation')(DeleteVideoInvitationModal)
