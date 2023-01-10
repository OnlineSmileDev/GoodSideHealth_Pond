import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Modal, { hideModal, showModal } from '../../../widgets/modal'
import { actions } from '../../VisitItem/visitItem.slice'

const { setSelectedMiddlePanelModal } = actions

const PHQCancelModal = ({ handleCancel }) => {
  const dispatch = useDispatch()
  const resetModal = () => dispatch(setSelectedMiddlePanelModal(null))

  useEffect(() => {
    //@ts-ignore
    dispatch(showModal())
  }, [dispatch])

  const handleClose = () => {
    //@ts-ignore
    dispatch(hideModal())
    resetModal()
  }

  const footer = (
    <>
      <Button className='btn-lg' variant='warning' onClick={handleClose}>
        Yes, Cancel
      </Button>
      <Button className='btn-small' variant='light' onClick={handleCancel}>
        Nevermind
      </Button>
    </>
  )
  return (
    <>
      {/* @ts-ignore */}
      <Modal
        title='Are You Sure You Want To Cancel The Assessment?'
        reset={handleClose}
        footer={footer}
        size='sm'
        backdrop='static'
        backdropClassName='opaque'
      >
        <p className='f-14 mb-30'>
          If you cancel the assessment, your responses will not be saved.
        </p>
      </Modal>
    </>
  )
}
export default PHQCancelModal
