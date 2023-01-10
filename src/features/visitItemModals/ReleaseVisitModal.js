import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import ModalFooter from 'components/molecules/ModalFooter'
import { BUTTON_VARIANT } from 'components/atoms/Button'
import { VISITS_STATUS, PROVIDER_VISIT_TYPE } from 'constants/visits'
import Modal, { hideModal, showModal } from '../../widgets/modal'
import { actions } from '../VisitItem/visitItem.slice'
import { updateVisit } from '../VisitItem/visitItem.asyncActions'
import { selectVisitDetails } from '../VisitItem/visitItem.selectors'
import { actions as action } from '../Visits/visits.slice'

const { setSelectedVisitItemModal } = actions
const { setProviderVisit } = action

const ReleaseVisitModal = () => {
  const router = useRouter()
  const selectedVisit = useSelector(selectVisitDetails)
  const dispatch = useDispatch()
  const resetModal = () => dispatch(setSelectedVisitItemModal(null))
  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])

  const handleClose = () => {
    dispatch(hideModal())
    resetModal()
  }
  const onReleaseVisit = () => {
    const updatedVisit = { status: VISITS_STATUS.WAITING }
    dispatch(
      updateVisit({
        visitId: selectedVisit.id,
        updatedVisit,
      })
    ).then(() => {
      handleClose()
      dispatch(setProviderVisit(PROVIDER_VISIT_TYPE.ON_DEMAND_VISITS))
      router.push('/')
    })
  }

  const footer = (
    <ModalFooter
      submitButtonProps={{
        onClick: onReleaseVisit,
        buttonText: 'Release Visit',
        variant: BUTTON_VARIANT.WARNING,
      }}
      cancelButtonProps={{ onClick: handleClose }}
    />
  )

  return (
    <Modal
      title='Are You Sure You Want to Release the Visit?'
      reset={resetModal}
      footer={footer}
      size='sm'
    >
      <p className='f-14 mb-30'>
        Releasing the visit will put the patient back in the waiting queue, and
        will give other providers the opportunity to claim the visit for
        themselves.
      </p>
    </Modal>
  )
}
export default ReleaseVisitModal
