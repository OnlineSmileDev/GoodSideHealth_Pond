import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import ModalFooter from 'components/molecules/ModalFooter'
import { BUTTON_VARIANT } from 'components/atoms/Button'
import { VISITS_STATUS } from 'constants/visits'
import { actions } from '../VisitItem/visitItem.slice'
import Modal, { hideModal, showModal } from '../../widgets/modal'
import { selectVisitDetails } from '../VisitItem/visitItem.selectors'
import { updateVisit } from '../VisitItem/visitItem.asyncActions'

const { setSelectedVisitItemModal } = actions

const CancelVisitModal = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const resetModal = () => dispatch(setSelectedVisitItemModal(null))
  const visitDetails = useSelector(selectVisitDetails)

  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])

  const handleClose = () => {
    dispatch(hideModal())
    resetModal()
  }

  const handleCancelVisit = () => {
    dispatch(
      updateVisit({
        visitId: visitDetails.id,
        updatedVisit: { status: VISITS_STATUS.CANCELLED, date: new Date() },
      })
    ).then((res) => {
      if (res.payload) router.push('/visits')
      resetModal()
    })
  }
  const footer = (
    <ModalFooter
      submitButtonProps={{
        onClick: handleCancelVisit,
        buttonText: 'Cancel Visit',
        variant: BUTTON_VARIANT.WARNING,
      }}
      cancelButtonProps={{ onClick: handleClose }}
    />
  )

  return (
    <Modal
      title='Are You Sure You Want to Cancel this Visit?'
      reset={resetModal}
      footer={footer}
      size='sm'
    >
      <p className='f-14 mb-30'>This action cannot be undone.</p>
    </Modal>
  )
}
export default CancelVisitModal
