import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, ListGroup, Row } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { ReadMoreField } from 'components/atoms/ReadMoreField'
import { VISITS_STATUS } from 'constants/visits'
import {
  temperatureFormatter,
  weightFormatter,
} from 'utils/weightTemperatureFormatter'
import { convertDateToUTCWithFullMonth } from 'utils/datePicker'
import { FORBIDDEN } from '../../infrastructure/http/http.constants'
import Modal, { hideModal, showModal } from '../../widgets/modal'
import { actions } from '../Visits/visits.slice'
import { selectSelectedVisit } from '../Visits/visits.selector'
import { selectVisitDetails } from '../VisitItem/visitItem.selectors'
import { updateVisit } from '../VisitItem'
import { actions as action } from '../VisitItem/visitItem.slice'
import { VISIT_MODALS } from './visitModals.constants'

const { setSelectedVisitModal } = actions
const { resetVisitDetails } = action

const ClaimVisitRequestModal = () => {
  const [allergiesReadMore, setAllergiesReadMore] = useState(false)
  const router = useRouter()
  const selectedVisit = useSelector(selectSelectedVisit)
  const visitDetails = useSelector(selectVisitDetails)
  const dispatch = useDispatch()
  const resetModal = () => {
    dispatch(setSelectedVisitModal(null))
    dispatch(resetVisitDetails())
  }

  const handleClose = () => {
    dispatch(hideModal())
    resetModal()
  }

  const onVisitUpdateError = ({ status }) => {
    if (status === FORBIDDEN) {
      dispatch(setSelectedVisitModal(VISIT_MODALS.CLAIMED_VISIT_ALERT))
    }
  }

  const {
    bodyTemperature,
    weight,
    pulseRate,
    pulseOx,
    respirationRate,
    bloodPressure,
    allergies,
    language,
    visitReason,
    diastolicPressure,
    systolicPressure,
    additionalNotes,
    firstName,
    lastName,
    dateOfBirth,
    birthSex,
  } = visitDetails

  const vitalSigns = {
    bodyTemperature,
    weight,
    pulseRate,
    pulseOx,
    respirationRate,
    bloodPressure,
    diastolicPressure,
    systolicPressure,
  }

  useEffect(() => {
    firstName && dispatch(showModal())
  }, [dispatch, firstName])

  const onClaimVisit = () => {
    const updatedVisit = { status: VISITS_STATUS.IN_PROGRESS }
    dispatch(
      updateVisit({
        visitId: selectedVisit.id,
        updatedVisit,
        onError: onVisitUpdateError,
      })
    ).then((res) => {
      if (res.payload) {
        router.push(`/visit/${selectedVisit.id}`)
        handleClose()
      }
    })
  }

  const footer = (
    <>
      <Button
        className='btn-lg'
        variant='success'
        onClick={onClaimVisit}
        data-test='claim-visit-modal-button'
      >
        Claim Visit
      </Button>
      <Button className='btn-small' variant='light' onClick={handleClose}>
        Cancel
      </Button>
    </>
  )

  return (
    <Modal
      title='Visit Details'
      reset={resetModal}
      footer={footer}
      isClaimVisitRequestModal={true}
    >
      <Row className='mb-30'>
        <Col md={6}>
          <h4 className='font-weight-bold card-title gotham lh-25 d-block mb-1 f-16'>
            {`${firstName} ${lastName}`}
          </h4>
          <ListGroup variant='flush' as='ul' className='mb-30'>
            <ListGroup.Item
              key='dateOfBirth'
              as='li'
              className='border-0 p-0 row no-gutters f-14 lh-25 mb-1'
            >
              <Col md={7}>
                <strong>Date Of Birth</strong>
              </Col>
              <Col md={5}>
                <span> {convertDateToUTCWithFullMonth(dateOfBirth)}</span>
              </Col>
            </ListGroup.Item>
            <ListGroup.Item
              key='biologicalSex'
              as='li'
              className='border-0 p-0 row no-gutters f-14 lh-25 mb-1'
            >
              <Col md={7}>
                <strong>Biological Sex</strong>
              </Col>
              <Col md={5}>
                <span> {birthSex || 'N/A'}</span>
              </Col>
            </ListGroup.Item>
            <ListGroup.Item
              key='allergies'
              as='li'
              className='border-0 p-0 row no-gutters f-14 lh-25 mb-1'
            >
              <Col md={7}>
                <strong>Allergies</strong>
              </Col>
              <Col md={5}>
                <ReadMoreField
                  fieldName='allergiesReadMore'
                  fieldData={allergies}
                  readMore={allergiesReadMore}
                  setReadMore={setAllergiesReadMore}
                />
              </Col>
            </ListGroup.Item>

            <ListGroup.Item
              key='primaryLanguage'
              as='li'
              className='border-0 p-0 row no-gutters f-14 lh-25 mb-1'
            >
              <Col md={7}>
                <strong>Primary Language</strong>
              </Col>
              <Col md={5}>
                <span> {language}</span>
              </Col>
            </ListGroup.Item>
            <ListGroup.Item
              key='reasonForVisit'
              as='li'
              className='border-0 p-0 row no-gutters f-14 lh-25 mb-1'
            >
              <Col md={7}>
                <strong>Reason for Visit</strong>
              </Col>
              <Col md={5}>
                <span> {visitReason}</span>
              </Col>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={6}>
          <h4 className='font-weight-bold card-title gotham lh-25 d-block mb-1 f-16'>
            Patient Vital Signs
          </h4>
          <ListGroup variant='flush' as='ul' className='mb-0'>
            <ListGroup.Item className='border-0 p-0 row no-gutters f-14 lh-25 mb-1'>
              <Col md={7}>
                <strong>Body Temperature</strong>
              </Col>
              <Col md={5}>
                <span>
                  {((vitalSigns.bodyTemperature ||
                    vitalSigns.bodyTemperature === 0) &&
                    temperatureFormatter(vitalSigns.bodyTemperature)) ||
                    'N/A'}
                </span>
              </Col>
              <Col md={7}>
                <strong>Weight</strong>
              </Col>
              <Col md={5}>
                <span>
                  {(vitalSigns.weight && weightFormatter(vitalSigns.weight)) ||
                    'N/A'}
                </span>
              </Col>
              <Col md={7}>
                <strong>Pulse Rate</strong>
              </Col>
              <Col md={5}>
                <span>
                  {vitalSigns.pulseRate ? `${vitalSigns.pulseRate} BPM` : 'N/A'}
                </span>
              </Col>
              <Col md={7}>
                <strong>Pulse OX</strong>
              </Col>
              <Col md={5}>
                <span>
                  {vitalSigns.pulseOx ? `${vitalSigns.pulseOx}%` : 'N/A'}
                </span>
              </Col>
              <Col md={7}>
                <strong>Respiration Rate</strong>
              </Col>
              <Col md={5}>
                <span>
                  {vitalSigns.respirationRate
                    ? `${vitalSigns.respirationRate} BPM`
                    : 'N/A'}
                </span>
              </Col>
              <Col md={7}>
                <strong>Blood Pressure</strong>
              </Col>
              <Col md={5}>
                <span>
                  {vitalSigns.systolicPressure
                    ? `${vitalSigns.systolicPressure}/${vitalSigns.diastolicPressure}`
                    : 'N/A'}
                </span>
              </Col>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      <Row className='f-14 lh-25 mb-1 align-items-center'>
        <Col md={3}>
          <strong>Additional Notes:</strong>
        </Col>
        <Col md={9} className='pl-md-4'>
          <span>{additionalNotes || 'N/A'}</span>
        </Col>
      </Row>
    </Modal>
  )
}

export default ClaimVisitRequestModal
