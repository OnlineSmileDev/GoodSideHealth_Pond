import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Row, Col, Image } from 'react-bootstrap'
import classNames from 'classnames'
import { ORDER_ACTIONS } from 'constants/orders'
import Modal, { hideModal, showModal } from '../../../widgets/modal'
import IMAGES from '../../../assets/images'
import { actions } from '../../VisitItem/visitItem.slice'
import { selectSelectedOrder } from '../../VisitItem/visitItem.selectors'

const { setSelectedMiddlePanelModal } = actions

const PHQCompletionModal = () => {
  const dispatch = useDispatch()
  const { action } = useSelector(selectSelectedOrder)
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
  const isAssessmentToBeEdited = action === ORDER_ACTIONS.EDIT
  const title = !isAssessmentToBeEdited
    ? 'Thank You for Completing the Questionnaire'
    : ' '

  const footer = (
    <Button className='btn-lg' variant='light' onClick={handleClose}>
      Close
    </Button>
  )
  return (
    <>
      {/* @ts-ignore */}
      <Modal
        title={title}
        reset={handleClose}
        footer={footer}
        size='sm'
        backdrop='static'
        backdropClassName='opaque'
      >
        <Container className='pb-4'>
          <Row>
            <Image
              src={IMAGES.DuckWithWave}
              alt='Goodside Health Duck'
              width={105}
            />
            <Col>
              <p
                className={classNames('f-14 mb-30', {
                  'tw-mt-5': isAssessmentToBeEdited,
                })}
              >
                {isAssessmentToBeEdited
                  ? 'The changes you have made on behalf of the patient have been saved.'
                  : 'Please let your facilitator know that you have completed the questionnaire so you can proceed with your provider visit.'}
              </p>
            </Col>
          </Row>
        </Container>
      </Modal>
    </>
  )
}
export default PHQCompletionModal
