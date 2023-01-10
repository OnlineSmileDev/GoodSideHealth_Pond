import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'react-bootstrap/Image'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import Modal, { hideModal, showModal } from '../../widgets/modal'
import { actions } from '../Visits/visits.slice'

const { setSelectedVisitModal } = actions

// TODO :- We can move ClaimedVisitAlerModal as template to components/templates
const ClaimedVisitAlertModal = () => {
  const dispatch = useDispatch()
  const resetModal = () => dispatch(setSelectedVisitModal(null))

  useEffect(() => {
    //@ts-ignore
    dispatch(showModal())
  }, [dispatch])

  const handleClose = () => {
    //@ts-ignore
    dispatch(hideModal())
    resetModal()
  }

  return (
    <>
      {/* @ts-ignore */}
      <Modal
        title='Visit Details'
        reset={resetModal}
        size='sm'
        isFooter={false}
      >
        <div className='tw-text-center'>
          <div className='tw-flex tw-justify-center tw-w-full tw-mb-2.5'>
            <Image src='/Provider.png' alt='' />
          </div>
          <p className='tw-text-sm tw-font-hind'>
            This visit has already been claimed by another provider.
          </p>
        </div>
        <Button
          size='lg'
          variant={BUTTON_VARIANT.LIGHT}
          className='tw-block tw-mt-2.5 tw-mb-5 tw-mx-auto'
          onClick={handleClose}
        >
          Close
        </Button>
      </Modal>
    </>
  )
}

export default ClaimedVisitAlertModal
