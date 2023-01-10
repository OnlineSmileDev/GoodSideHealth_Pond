import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import { useSelector, useDispatch } from 'react-redux'
import { selectShowModal } from './modal.selectors'
import { actions } from './modal.slice'
import Icons from '../../assets/icons'
import classNames from 'classnames'

const { hideModal } = actions
// TODO :- We can move Modal component to components/organism
export default function UrgentCareModal({
  children,
  header,
  footer,
  title,
  reset,
  size = 'sm',
  onClose = true,
  isFullWidth = false,
  isHeader = true,
  isFooter = true,
  isFullHeader = false,
  backdrop,
  backdropClassName,
  isClaimVisitRequestModal = false,
}) {
  const show = useSelector(selectShowModal)
  const dispatch = useDispatch()
  const modalName = 'modal-' + title?.replace(/\s/g, '-').toLowerCase()
  const handleClose = () => {
    dispatch(hideModal())
    if (reset) reset()
  }
  return (
    <Modal
      show={show}
      onHide={handleClose}
      id={modalName}
      dialogClassName='modal-dialog-centered'
      size={size}
      backdrop={backdrop}
      backdropClassName={backdropClassName}
    >
      {isHeader && (
        <Modal.Header
          className={classNames('border-0', {
            'p-0': isFullHeader,
            'pb-30': isClaimVisitRequestModal,
          })}
        >
          {header || (
            <Modal.Title
              className={classNames('f-16 font-weight-bold lh-30', {
                hind: isClaimVisitRequestModal,
              })}
            >
              {title}
            </Modal.Title>
          )}
          {onClose && (
            <button
              className='close p-0 d-flex align-items-center'
              onClick={handleClose}
            >
              <span className='font-weight-bold f-14 mr-2'>Cancel</span>
              <Image
                src={Icons.closeIcon}
                alt='close'
                width={isClaimVisitRequestModal ? '15' : '25'}
              />
            </button>
          )}
        </Modal.Header>
      )}
      <Modal.Body
        className={classNames({ 'p-0': isFullWidth, 'py-0': !isFullWidth })}
      >
        {children}
      </Modal.Body>
      {isFooter && (
        <Modal.Footer
          className={classNames('justify-content-start border-0', {
            'pt-50': isClaimVisitRequestModal,
          })}
        >
          {footer}
        </Modal.Footer>
      )}
    </Modal>
  )
}
