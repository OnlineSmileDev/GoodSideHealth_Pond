import React, { useState } from 'react'
import classNames from 'classnames'
import { Col, Card, ListGroup, Accordion, Image, Badge } from 'react-bootstrap'
import { MAJOR_PATIENT_AGE, PATIENT_STATUS } from 'constants/patients'
import { getAgeFromDateOfBirth } from 'utils/getAgeFromDateOfBirth'
import {
  getFormattedDate,
  convertDateToUTCWithFullMonth,
} from 'utils/datePicker'
import Icons from '../../assets/icons'

const PatientDetails = ({ patientDetails }) => {
  const [toggle, setToggle] = useState({
    patientDetails: true,
    primaryGuardian: true,
  })

  const {
    patientFirstName,
    patientLastName,
    patientDob,
    patientBirthSex,
    language,
    pgFirstName,
    pgLastName,
    pgPhone1,
    pgRelationToPatient,
    status,
  } = patientDetails

  const patientAge = getAgeFromDateOfBirth(getFormattedDate(patientDob))
  const CONTACT = 'Contact'
  const GUARDIAN = 'Guardian'

  return (
    <>
      <Accordion defaultActiveKey='0'>
        <Card className='shadow-sm border-0 mb-30'>
          <Card.Body className='p-20'>
            <div
              className='d-flex align-items-center mb-10'
              data-test='patient-name'
            >
              <Card.Title
                className={classNames(
                  'font-weight-bold gotham lh-25 d-block mb-10 f-18 tw-mt-2',
                  { 'tw-text-danger': status === PATIENT_STATUS.INACTIVE }
                )}
                data-test='patient-name'
              >
                {`${patientFirstName} ${patientLastName}`}
                {status === PATIENT_STATUS.INACTIVE && ' (INACTIVE)'}
              </Card.Title>
            </div>
            <Accordion.Collapse eventKey='0'>
              <ListGroup variant='flush' as='ul' className='mb-15'>
                <ListGroup.Item className='border-0 p-0 row no-gutters f-14 lh-25 mb-1'>
                  <Col md={7}>
                    <strong>Date of Birth </strong>
                  </Col>
                  <Col md={5}>
                    {patientAge > MAJOR_PATIENT_AGE ? (
                      <span className='block'>
                        {convertDateToUTCWithFullMonth(patientDob)}
                        <Badge
                          variant='warning'
                          className='border-0 p-0 btn-auto rounded-circle d-inline-flex align-items-center justyfy-content-center f-10 ml-1 text-white badge-rounded'
                        >
                          {MAJOR_PATIENT_AGE}+
                        </Badge>
                      </span>
                    ) : (
                      <span>
                        {convertDateToUTCWithFullMonth(patientDob) || 'N/A'}
                      </span>
                    )}
                  </Col>
                  <Col md={7}>
                    <strong>Birth Sex</strong>
                  </Col>
                  <Col md={5}>
                    <span>{patientBirthSex || 'N/A'} </span>
                  </Col>
                  <Col md={7}>
                    <strong>Primary Language</strong>
                  </Col>
                  <Col md={5}>
                    <span>{language || 'N/A'} </span>
                  </Col>
                </ListGroup.Item>
              </ListGroup>
            </Accordion.Collapse>
            <Accordion.Toggle
              eventKey='0'
              className='text-nowrap p-0 f-14 lh-25 btn btn-link text-dark font-weight-bold accordion-btn-left'
              onClick={() =>
                setToggle({ ...toggle, patientDetails: !toggle.patientDetails })
              }
            >
              {toggle.patientDetails ? 'Less Details' : 'View More'}
              <Image
                src={
                  toggle.patientDetails
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

      <Accordion defaultActiveKey='1'>
        <Card className='shadow-sm border-0 mb-30'>
          <Card.Body className='p-20'>
            <div className='d-flex align-items-center mb-10'>
              <Card.Title className='font-weight-bold lh-25 mb-0 f-18'>
                Primary {patientAge > MAJOR_PATIENT_AGE ? CONTACT : GUARDIAN}
              </Card.Title>
            </div>
            <Accordion.Collapse eventKey='1'>
              <ListGroup variant='flush' as='ul' className='mb-15'>
                <ListGroup.Item className='border-0 p-0 row no-gutters f-14 lh-25 mb-1'>
                  <Col md={7}>
                    <strong>Name</strong>
                  </Col>
                  <Col md={5}>
                    <span>
                      {pgFirstName ? `${pgFirstName} ${pgLastName}` : 'N/A'}
                    </span>
                  </Col>
                  <Col md={7}>
                    <strong>Relationship</strong>
                  </Col>
                  <Col md={5}>
                    <span>{pgRelationToPatient || 'N/A'}</span>
                  </Col>
                  <Col md={7}>
                    <strong>Phone Number</strong>
                  </Col>
                  <Col md={5}>
                    <span>{pgPhone1 || 'N/A'}</span>
                    {/* TODO- May be Phone-Number formatter needed */}
                  </Col>
                </ListGroup.Item>
              </ListGroup>
            </Accordion.Collapse>
            <Accordion.Toggle
              eventKey='1'
              className='text-nowrap p-0 f-14 lh-25 btn btn-link text-dark font-weight-bold accordion-btn-left'
              onClick={() =>
                setToggle({
                  ...toggle,
                  primaryGuardian: !toggle.primaryGuardian,
                })
              }
            >
              {toggle.primaryGuardian ? 'Less Details' : 'View More'}
              <Image
                src={
                  toggle.primaryGuardian
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
    </>
  )
}

export default PatientDetails
