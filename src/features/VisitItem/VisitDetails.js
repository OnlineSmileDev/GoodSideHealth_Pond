import React, { useEffect, useState } from 'react'
import { Col, Card, ListGroup, Button, Image, Accordion } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { BadgeRound, BADGE_VARIANT } from 'components/atoms/BadgeRound'
import { ReadMoreField } from 'components/atoms/ReadMoreField'
import { AT_HOME_TELEHEALTH } from 'constants/placeOfService'
import { USER_ROLES } from 'constants/users'
import { VISITS_STATUS } from 'constants/visits'
import {
  temperatureFormatter,
  weightFormatter,
} from 'utils/weightTemperatureFormatter'
import { convertDateToUTCWithFullMonth } from 'utils/datePicker'
import { isEmptyObject } from 'utils/isEmptyObject'
import { actions } from './visitItem.slice'
import { VISIT_ITEM_MODALS } from '../visitItemModals/visitItemModal.constants'
import Icons from '../../assets/icons'
import { selectCurrentUserHasPermissions } from '../../infrastructure/userContext'

const { setSelectedVisitItemModal } = actions

const VisitDetails = ({ visitDetails }) => {
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState({
    visitSummary: true,
    visitDetails: true,
    vitalSigns: true,
  })
  const [readMore, setReadMore] = useState({
    allergies: false,
    medications: false,
    conditions: false,
  })
  const currentUserHasPermissions = useSelector(selectCurrentUserHasPermissions)
  const isProvider = currentUserHasPermissions([USER_ROLES.PROVIDER])

  const {
    // patient,
    visitReason,
    date,
    additionalNotes,
    location,
    // TODO: Uncomment when pharmacy is brought back
    // pharmacyName,
    pharmacyAddress = '',
    // pharmacyAddress2 = '',
    // pharmacyCity = '',
    // pharmacyState = '',
    // pharmacyZipcode = '',
    bodyTemperature,
    weight,
    pulseRate,
    pulseOx,
    respirationRate,
    diastolicPressure,
    systolicPressure,
    createdAt,
    status,
    provider,
    facilitator,
    allergies,
    medications,
    conditions,
  } = visitDetails

  const temporaryPharmacyAddress = visitDetails?.discharge
    ? visitDetails?.discharge?.pharmacyAddress
    : pharmacyAddress

  const vitalSigns = {
    bodyTemperature,
    weight,
    pulseRate,
    pulseOx,
    respirationRate,
    diastolicPressure,
    systolicPressure,
  }

  // PERMISSION:- Can Create orders && ! Can delete orders
  const hasEmptyVitalSigns = !isProvider && isEmptyObject(vitalSigns)
  const showProviderName =
    status === VISITS_STATUS.IN_PROGRESS ||
    status === VISITS_STATUS.COMPLETED ||
    status === VISITS_STATUS.ENDED
  useEffect(() => {
    hasEmptyVitalSigns &&
      status === VISITS_STATUS.WAITING &&
      dispatch(setSelectedVisitItemModal(VISIT_ITEM_MODALS.PATIENT_VITAL_SIGNS))
  }, [dispatch, hasEmptyVitalSigns, status])

  const openVisitDetailsModal = () => {
    dispatch(setSelectedVisitItemModal(VISIT_ITEM_MODALS.VISIT_DETAILS))
  }
  const openPatientDetailsModal = () => {
    dispatch(setSelectedVisitItemModal(VISIT_ITEM_MODALS.PATIENT_DETAILS))
  }
  // TODO: Replace role check with extraction of role and using it to fetch role specific values like we did for session logs
  const role = isProvider ? USER_ROLES.PROVIDER : USER_ROLES.NURSE

  const isAtHomeVisit = visitDetails.placeOfServiceId === AT_HOME_TELEHEALTH

  return (
    <>
      <Accordion id='health-information-accordion' defaultActiveKey='0'>
        <Card className='shadow-sm border-0 mb-30'>
          <Card.Body className='p-20'>
            <div className='d-flex align-items-center mb-10'>
              <Card.Title className='font-weight-bold gotham lh-25 d-block mb-10 f-18'>
                Health Information
              </Card.Title>
              <Button
                className={`font-weight-bold ml-auto btn-auto p-0 pendo-patient-details-${role} e2e-patient-details-${role}`}
                variant='link'
                onClick={openPatientDetailsModal}
              >
                Edit
              </Button>
            </div>
            <Accordion.Collapse eventKey='0'>
              <ListGroup variant='flush' as='ul' className='mb-15'>
                <ListGroup.Item className='border-0 p-0 row no-gutters f-14 lh-25 mb-1'>
                  <Col md={7}>
                    <strong>Allergies</strong>
                  </Col>
                  <Col md={5}>
                    <ReadMoreField
                      fieldName='allergies'
                      fieldData={allergies}
                      readMore={readMore}
                      setReadMore={setReadMore}
                      testClassName={'e2e-allergies'}
                    />
                  </Col>
                  <Col md={7}>
                    <strong>Known Medications</strong>
                  </Col>
                  <Col md={5}>
                    <ReadMoreField
                      fieldName='medications'
                      fieldData={medications}
                      readMore={readMore}
                      setReadMore={setReadMore}
                      testClassName={'e2e-medications'}
                    />
                  </Col>
                  <Col md={7}>
                    <strong>Known Conditions</strong>
                  </Col>
                  <Col md={5}>
                    <ReadMoreField
                      fieldName='conditions'
                      fieldData={conditions}
                      readMore={readMore}
                      setReadMore={setReadMore}
                      testClassName={'e2e-conditions'}
                    />
                  </Col>
                </ListGroup.Item>
              </ListGroup>
            </Accordion.Collapse>
            <Accordion.Toggle
              eventKey='0'
              className='text-nowrap p-0 f-14 lh-25 btn btn-link text-dark font-weight-bold accordion-btn-left'
              onClick={() =>
                setToggle({ ...toggle, visitSummary: !toggle.visitSummary })
              }
            >
              {toggle.visitSummary ? 'Less Details' : 'View More'}
              <Image
                src={
                  toggle.visitSummary ? Icons.arrowUpIcon : Icons.arrowDownIcon
                }
                alt='arrow-up-down-icon'
                className='ml-2'
                width='15'
              ></Image>
            </Accordion.Toggle>
          </Card.Body>
        </Card>
      </Accordion>

      {!visitDetails.visitMetadata && (
        <Accordion id='visit-details-accordion' defaultActiveKey='1'>
          <Card className='shadow-sm border-0 mb-30'>
            <Card.Body className='p-20'>
              <div className='d-flex align-items-center mb-10'>
                <Card.Title className='font-weight-bold lh-25 mb-0 f-18'>
                  Visit Details
                </Card.Title>
                {isAtHomeVisit && (
                  <div className='tw-ml-2.5'>
                    <BadgeRound variant={BADGE_VARIANT.PRIMARY}>
                      <Image
                        src={Icons.homeVisitBadge}
                        alt='homeVisitBadge'
                        className='tw-mb-0.5'
                      />
                    </BadgeRound>
                  </div>
                )}
                <Button
                  className={`font-weight-bold ml-auto btn-auto p-0 pendo-visit-details-${role} e2e-visit-details-${role}`}
                  variant='link'
                  onClick={openVisitDetailsModal}
                >
                  Edit
                </Button>
              </div>
              <Accordion.Collapse eventKey='1'>
                <ListGroup variant='flush' as='ul' className='mb-15'>
                  <ListGroup.Item className='border-0 p-0 row no-gutters f-14 lh-25 mb-1'>
                    <Col md={7}>
                      <strong>Visit Date</strong>
                    </Col>
                    <Col md={5}>
                      <span>
                        {convertDateToUTCWithFullMonth(date || createdAt) ||
                          'N/A'}
                      </span>
                    </Col>
                    <Col md={7}>
                      <strong>Visit Location</strong>
                    </Col>
                    <Col md={5}>
                      <span>{location?.name || 'N/A'}</span>
                    </Col>
                    <Col md={7}>
                      <strong>Reason For Visit</strong>
                    </Col>
                    <Col md={5}>
                      <span data-test='visit-reason'>
                        {visitReason || 'N/A'}
                      </span>
                    </Col>
                    <Col md={7}>
                      <strong>Additional Notes</strong>
                    </Col>
                    <Col md={5}>
                      <span>{additionalNotes || 'N/A'} </span>
                    </Col>
                    <Col md={12}>
                      <hr className='line-break-hr' />
                    </Col>
                    <Col md={7}>
                      <strong>Facilitator</strong>
                    </Col>
                    <Col md={5}>
                      <span>
                        {facilitator?.firstName} {facilitator?.lastName}
                      </span>
                    </Col>
                    <Col md={7}>
                      <strong>Facilitator Phone</strong>
                    </Col>
                    <Col md={5}>
                      <span>{facilitator?.phoneNumber || 'N/A'}</span>
                    </Col>
                    {showProviderName && (
                      <>
                        <Col md={7}>
                          <strong>Provider</strong>
                        </Col>
                        <Col md={5}>
                          <span>
                            {provider?.firstName} {provider?.lastName}
                            {provider?.credentials
                              ? `, ${provider?.credentials}`
                              : ''}
                          </span>
                        </Col>
                      </>
                    )}
                    <Col md={7}>
                      <strong>Pharmacy</strong>
                    </Col>
                    <Col md={5}>
                      {!temporaryPharmacyAddress ? (
                        <span>{'N/A'} </span>
                      ) : (
                        <span>
                          {/* // TODO: Uncomment when pharmacy is brought back */}
                          {/* {`${pharmacyName}`} */}
                          {/* <br /> */}
                          {/* {`${
														pharmacyAddress || ''
													} ${pharmacyAddress2} ${pharmacyCity}, ${pharmacyState} ${pharmacyZipcode}`} */}
                          {temporaryPharmacyAddress}
                        </span>
                      )}
                    </Col>
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Collapse>
              <Accordion.Toggle
                eventKey='1'
                className='text-nowrap p-0 f-14 lh-25 btn btn-link text-dark font-weight-bold accordion-btn-left'
                onClick={() =>
                  setToggle({ ...toggle, visitDetails: !toggle.visitDetails })
                }
              >
                {toggle.visitDetails ? 'Less Details' : 'View More'}
                <Image
                  src={
                    toggle.visitDetails
                      ? Icons.arrowUpIcon
                      : Icons.arrowDownIcon
                  }
                  alt='arrow-up-down-icon'
                  className='ml-2'
                  width='15'
                ></Image>
              </Accordion.Toggle>
            </Card.Body>
          </Card>
        </Accordion>
      )}

      <Accordion defaultActiveKey='2'>
        <Card className='shadow-sm border-0 mb-30'>
          <Card.Body className='p-20'>
            <div className='d-flex align-items-center mb-10'>
              <Card.Title className='font-weight-bold lh-25 mb-0 f-18'>
                Patient Vital Signs
              </Card.Title>
              <Button
                className={`font-weight-bold ml-auto btn-auto p-0 pendo-vital-signs-${role} e2e-vital-signs-${role}`}
                variant='link'
                onClick={() => {
                  dispatch(
                    setSelectedVisitItemModal(
                      VISIT_ITEM_MODALS.PATIENT_VITAL_SIGNS
                    )
                  )
                }}
              >
                Edit
              </Button>
            </div>
            <Accordion.Collapse eventKey='2'>
              <ListGroup variant='flush' as='ul' className='mb-15'>
                <ListGroup.Item className='border-0 p-0 row no-gutters f-14 lh-25 mb-1'>
                  <Col md={7} lg={6}>
                    <strong>Body Temperature</strong>
                  </Col>
                  <Col md={5} lg={6}>
                    <span>
                      {((vitalSigns.bodyTemperature ||
                        vitalSigns.bodyTemperature === 0) &&
                        temperatureFormatter(vitalSigns.bodyTemperature)) ||
                        'N/A'}
                    </span>
                  </Col>
                  <Col md={7} lg={6}>
                    <strong>Weight</strong>
                  </Col>
                  <Col md={5} lg={6}>
                    <span className='e2e-weight'>
                      {(vitalSigns.weight &&
                        weightFormatter(vitalSigns.weight)) ||
                        'N/A'}
                    </span>
                  </Col>
                  <Col md={7} lg={6}>
                    <strong>Pulse Rate</strong>
                  </Col>
                  <Col md={5} lg={6}>
                    <span className='e2e-pulse-rate'>
                      {vitalSigns.pulseRate
                        ? `${vitalSigns.pulseRate} BPM`
                        : 'N/A'}
                    </span>
                  </Col>
                  <Col md={7} lg={6}>
                    <strong>Pulse OX</strong>
                  </Col>
                  <Col md={5} lg={6}>
                    <span>
                      {vitalSigns.pulseOx ? `${vitalSigns.pulseOx}%` : 'N/A'}
                    </span>
                  </Col>
                  <Col md={7} lg={6}>
                    <strong>Respiration Rate</strong>
                  </Col>
                  <Col md={5} lg={6}>
                    <span>
                      {' '}
                      {vitalSigns.respirationRate
                        ? `${vitalSigns.respirationRate} BPM`
                        : 'N/A'}
                    </span>
                  </Col>
                  <Col md={7} lg={6}>
                    <strong>Blood Pressure</strong>
                  </Col>
                  <Col md={5} lg={6}>
                    <span>
                      {vitalSigns.systolicPressure ||
                      vitalSigns.diastolicPressure
                        ? `${vitalSigns.systolicPressure}/${vitalSigns.diastolicPressure}`
                        : 'N/A'}
                    </span>
                  </Col>
                </ListGroup.Item>
              </ListGroup>
            </Accordion.Collapse>
            <Accordion.Toggle
              eventKey='2'
              className='text-nowrap p-0 f-14 lh-25 btn btn-link text-dark font-weight-bold accordion-btn-left'
              onClick={() =>
                setToggle({ ...toggle, vitalSigns: !toggle.vitalSigns })
              }
            >
              {toggle.vitalSigns ? 'Less Details' : 'View More'}
              <Image
                src={
                  toggle.vitalSigns ? Icons.arrowUpIcon : Icons.arrowDownIcon
                }
                alt='arrow-up-down-icon'
                className='ml-2'
                width='15'
              ></Image>
            </Accordion.Toggle>
          </Card.Body>
        </Card>
      </Accordion>
    </>
  )
}

export default VisitDetails
