import React, { useEffect } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import AssessmentDetail from 'components/atoms/AssessmentDetail'
import AssessmentResult from 'components/atoms/AssessmentResult'
import { getDateInDateTimeFormat } from 'utils/datePicker'
import Modal, { hideModal, showModal } from '../../../widgets/modal'
import { actions } from '../../VisitItem/visitItem.slice'
import {
  selectSelectedOrder,
  selectVisitDetails,
} from '../../VisitItem/visitItem.selectors'
import { prepareResultsForViewing } from './PHQJsonSchema'

const { setSelectedMiddlePanelModal } = actions

const PHQResultsModal = () => {
  const { assessmentResults, completedAt } = useSelector(selectSelectedOrder)
  const {
    visitReason,
    location: { name: location },
    provider,
    facilitator,
  } = useSelector(selectVisitDetails)
  const providerName = `${provider.firstName} ${provider.lastName}${
    provider.credentials ? `, ${provider.credentials}` : ''
  }`
  const facilitatorName = `${facilitator.firstName} ${facilitator.lastName}${
    facilitator.credentials ? `, ${facilitator.credentials}` : ''
  }`
  const { results, totalScore } = prepareResultsForViewing(assessmentResults)

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
    <Button className='btn-lg' variant='light' onClick={handleClose}>
      Close
    </Button>
  )

  return (
    //@ts-ignore
    <Modal
      title='Patient Health Questionnaire'
      reset={handleClose}
      footer={footer}
      size='sm'
    >
      <Container className='pb-4'>
        <Row>
          <AssessmentDetail
            name='Last Completed'
            value={getDateInDateTimeFormat(completedAt)}
          />
          <AssessmentDetail name='Facilitator Name' value={facilitatorName} />
          <AssessmentDetail name='Provider Name' value={providerName} />
          <AssessmentDetail name='Visit Reason' value={visitReason} />
          <AssessmentDetail name='Visit Location' value={location} />
          <AssessmentDetail name='PHQ Score' value={totalScore} />
        </Row>
      </Container>
      <Container>
        {results.map((result, i) => {
          if (i === 2) {
            return (
              <>
                <hr className='mb-16 bg-primary' />
                <AssessmentResult key={result.question} {...result} />
              </>
            )
          }
          return <AssessmentResult key={result.question} {...result} />
        })}
      </Container>
    </Modal>
  )
}

export default PHQResultsModal
