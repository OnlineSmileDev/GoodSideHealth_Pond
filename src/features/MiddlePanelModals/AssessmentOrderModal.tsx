import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { withFeature } from 'flagged'
import { PROVIDER_ORDER_TYPES } from 'constants/orders'
import { getAgeFromDateOfBirth } from 'utils/getAgeFromDateOfBirth'
import { actions } from '../VisitItem/visitItem.slice'
import Modal, { hideModal, showModal } from '../../widgets/modal'
import { addOrUpdateOrder } from '../VisitItem/visitItem.asyncActions'
import { ASSESSMENTS } from './middlePanelModal.constants'
import {
  selectPatientVisitDetails,
  selectVisitDetails,
} from '../VisitItem/visitItem.selectors'

const { setSelectedMiddlePanelModal } = actions
const MENTAL_HEALTH_PROGRAM = 7
const MINIMUM_AGE_PHQ_ELIGIBITY = 11
// TODO :- We can move AssessmentOrderModal as template to components/templates
const AssessmentOrderModal = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { id: visitId } = router.query
  const [assessmentType, setAssessmentType] = useState('')
  const resetModal = () => dispatch(setSelectedMiddlePanelModal(null))
  const { programs } = useSelector(selectPatientVisitDetails)
  const { dateOfBirth } = useSelector(selectVisitDetails)
  const hasConsentToMentalHealth = programs?.find(
    ({ id, isActive }) => id === MENTAL_HEALTH_PROGRAM && isActive
  )
  const isOfEligibleAge =
    getAgeFromDateOfBirth(dateOfBirth) >= MINIMUM_AGE_PHQ_ELIGIBITY

  const isPHQEligible = hasConsentToMentalHealth && isOfEligibleAge

  useEffect(() => {
    //@ts-ignore
    dispatch(showModal())
  }, [dispatch])

  const handleClose = () => {
    //@ts-ignore
    dispatch(hideModal())
    resetModal()
  }

  const onSubmit = () => {
    const updatedOrder = {
      visitId: Number(visitId),
      type: assessmentType,
      status: 'Incomplete',
    }
    dispatch(
      // @ts-ignore
      addOrUpdateOrder({ updatedOrder, type: PROVIDER_ORDER_TYPES.ASSESSMENT })
    )
    resetModal()
  }

  const footer = (
    <>
      <Button className='btn-lg' onClick={onSubmit} disabled={!assessmentType}>
        Submit
      </Button>
      <Button className='btn-small' variant='light' onClick={handleClose}>
        Cancel
      </Button>
    </>
  )
  return (
    <>
      {/* @ts-ignore */}
      <Modal
        title='Assessment Order'
        reset={resetModal}
        footer={footer}
        size='sm'
      >
        <p className='f-14 mb-30'>
          Please select the assessment test for your order:
        </p>
        <Form.Group className='mb-3'>
          <Form.Control
            as='select'
            placeholder='Select Assessment'
            aria-label='assessments'
            value={assessmentType}
            onChange={(e) => setAssessmentType(e.target.value)}
          >
            <option value=''>Select Assessment</option>
            <option
              disabled={!isPHQEligible}
              value={ASSESSMENTS.PHQ_ASSESSMENT}
            >
              PHQ9
            </option>
          </Form.Control>
        </Form.Group>
      </Modal>
    </>
  )
}
export default withFeature('assessmentOrder')(AssessmentOrderModal)
