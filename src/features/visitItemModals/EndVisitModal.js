import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'
import ModalFooter from 'components/molecules/ModalFooter'
import { BUTTON_VARIANT } from 'components/atoms/Button'
import { ORDER_STATUS } from 'constants/orders'
import { USER_ROLES } from 'constants/users'
import { VISITS_STATUS } from 'constants/visits'
import Modal, { hideModal, showModal } from '../../widgets/modal'
import { updateVisit } from '../VisitItem/visitItem.asyncActions'
import { selectVisitDetails } from '../VisitItem/visitItem.selectors'
import { selectCurrentUserHasPermissions } from '../../infrastructure/userContext/userContext.selectors'
import { VISIT_ITEM_MODALS } from './visitItemModal.constants'
import { actions } from '../VisitItem/visitItem.slice'

const { setSelectedVisitItemModal } = actions
const MIN_INCOMPLETE_ORDERS = 0

const EndVisitModal = () => {
  const dispatch = useDispatch()
  const resetModal = () => dispatch(setSelectedVisitItemModal(null))
  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])

  const selectedVisit = useSelector(selectVisitDetails)
  const { id, visitMetadata, tests, orders } = selectedVisit
  const handleClose = () => {
    dispatch(hideModal())
    resetModal()
  }
  const currentUserHasPermissions = useSelector(selectCurrentUserHasPermissions)
  const isProvider = currentUserHasPermissions([USER_ROLES.PROVIDER])
  let areTestsComplete
  let areOrdersComplete
  // UNUSED_CHECK: Only provider can access EndVisitModal
  if (isProvider) {
    areTestsComplete = tests?.every(
      ({ status, completedAt }) =>
        status !== ORDER_STATUS.PENDING && completedAt
    )
    areOrdersComplete = orders?.every(
      ({ status, completedAt }) =>
        status !== ORDER_STATUS.INCOMPLETE && completedAt
    )
  }
  const incompleteOrders =
    orders.filter((order) => order.status === ORDER_STATUS.INCOMPLETE).length +
    tests.filter((test) => test.status === ORDER_STATUS.INCOMPLETE).length

  const onEndVisit = () => {
    if (visitMetadata && visitMetadata.isScheduledVisit) {
      dispatch(
        setSelectedVisitItemModal(VISIT_ITEM_MODALS.SCHEDULE_ENDING_VISIT)
      )
    } else {
      const updatedVisit = { status: VISITS_STATUS.ENDED, date: new Date() }
      dispatch(updateVisit({ visitId: id, updatedVisit })).then(() => {
        handleClose()
      })
    }
  }

  const footer = (
    <ModalFooter
      submitButtonProps={{
        onClick: onEndVisit,
        className:
          'btn-lg pendo-session-visit-warning-modal-finalize-button e2e-visit-warning-modal-finalize-button',
        variant: BUTTON_VARIANT.WARNING,
        buttonText: visitMetadata?.isScheduledVisit
          ? 'Finalize for Testing'
          : 'End Visit',
        'data-test': 'warning-modal-finalize-button',
      }}
      cancelButtonProps={{ onClick: handleClose }}
    />
  )

  return (
    <Modal
      title={
        visitMetadata?.isScheduledVisit
          ? 'Finalize for Testing'
          : 'Are You Sure You Want to End the Visit?'
      }
      reset={resetModal}
      footer={footer}
      size='sm'
    >
      {incompleteOrders > MIN_INCOMPLETE_ORDERS && (
        <Alert
          variant='danger'
          className='px-20 py-1 d-flex align-items-center mb-3'
        >
          <span className='f-14 font-weight-bold hind text-white'>
            There are {incompleteOrders} Orders That Have Not Been Completed
          </span>
        </Alert>
      )}
      <p className='f-14 mb-30'>
        {visitMetadata?.isScheduledVisit
          ? "If you'd like to finalize this visit for testing, please confirm using the below button."
          : !isProvider || (areTestsComplete && areOrdersComplete)
          ? "You are in a virtual visit. If you'd like to end this visit, please confirm using the button below."
          : "If you'd like to end the visit, please confirm using the button below."}
      </p>
    </Modal>
  )
}
export default EndVisitModal
