import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { actions } from '../VisitItem/visitItem.slice'
import Modal, { hideModal, showModal } from '../../widgets/modal'
import { selectSelectedOrder } from '../VisitItem/visitItem.selectors'
import { removeOrder } from '../VisitItem/visitItem.asyncActions'

const { setSelectedMiddlePanelModal } = actions

const RemoveOrderModal = () => {
  const dispatch = useDispatch()
  const resetModal = () => dispatch(setSelectedMiddlePanelModal(null))

  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])
  const { id, type } = useSelector(selectSelectedOrder)

  const handleClose = () => {
    dispatch(hideModal())
    resetModal()
  }

  const onRemoveOrder = () => {
    dispatch(removeOrder({ id, type })).then(() => {
      handleClose()
    })
  }

  const footer = (
    <>
      <Button className='btn-lg' variant='warning' onClick={onRemoveOrder}>
        Remove Item
      </Button>
      <Button className='btn-small' variant='light' onClick={handleClose}>
        Cancel
      </Button>
    </>
  )
  return (
    <>
      <Modal
        title='Are You Sure You Want To Remove This Item?'
        reset={resetModal}
        footer={footer}
        size='sm'
      >
        <p className='f-14 mb-30'>This action cannot be undone.</p>
      </Modal>
    </>
  )
}
export default RemoveOrderModal
