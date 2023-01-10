import React from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Row, Col, Badge, Button } from 'react-bootstrap'
import { Feature } from 'flagged'
import { Card, CARD_VARIANT } from 'components/atoms/Card'
import { NoCostBadge } from 'components/atoms/NoCostBadge'
import { Indicator, INDICATOR_VARIANT } from 'components/atoms/Indicator'
import { MAJOR_PATIENT_AGE, PATIENT_STATUS } from 'constants/patients'
import { USER_ROLES } from 'constants/users'
import { getFormattedDate } from 'utils/datePicker'
import { capitalizeFirstLetterOfEachWord } from 'utils/capitalizeFirstLetterOfEachWord'
import { isAgeIsGreaterThan21 } from '../../helpers/dobFormatter'
import { selectLocations } from '../ScreeningDataDashboard/screeningDataDashboard.selectors'
import { selectCurrentUserHasPermissions } from '../../infrastructure/userContext/userContext.selectors'

const PatientArchive = ({ patients }) => {
  const locations = useSelector(selectLocations)
  const currentUserHasPermissions = useSelector(selectCurrentUserHasPermissions)
  const isProvider = currentUserHasPermissions([USER_ROLES.PROVIDER])
  const router = useRouter()

  const getPatientLocationName = (patientLocationId) => {
    const location = locations.find(({ id }) => id === patientLocationId)
    return location ? capitalizeFirstLetterOfEachWord(location?.name) : 'N/A'
  }

  const getPatientStatus = (programs) =>
    programs && programs.length
      ? PATIENT_STATUS.ACTIVE
      : PATIENT_STATUS.INACTIVE

  const handlePatientView = (id) => router.push(`/patient/${id}`)

  const getCardVariant = (status) => {
    switch (status) {
      case PATIENT_STATUS.ACTIVE:
        return CARD_VARIANT.SUCCESS
      case PATIENT_STATUS.INACTIVE:
        return CARD_VARIANT.WARNING
      default:
        return ''
    }
  }

  return patients.map((patient, key) => {
    const {
      id,
      firstName,
      lastName,
      programs,
      dateOfBirth,
      locationId,
      noCostVisit,
    } = patient

    const status = getPatientStatus(programs)
    return (
      <Card key={id} className='tw-mb-5' variant={getCardVariant(status)}>
        <Row className='align-items-center'>
          <Col xl={4} lg={6} className='mb-4 mb-xl-0'>
            <h4
              className='lh-40 mb-1 font-weight-bold f-22 d-flex align-items-center'
              data-test={`patient-name-${key}`}
            >
              <Feature name='insuranceValidationBadge'>
                {noCostVisit ? <NoCostBadge /> : null}
              </Feature>
              {isAgeIsGreaterThan21(dateOfBirth) && (
                <Badge
                  className='badge-round rounded-circle border-0 text-white p-0 text-center f-10 lh-25 mr-2'
                  variant='warning'
                >
                  {MAJOR_PATIENT_AGE}+
                </Badge>
              )}
              {`${firstName} ${lastName}`}
            </h4>
            <Badge
              className={classNames('font-weight-bold badge-sm w-160', {
                'badge-outline-warning':
                  getPatientStatus(programs) === PATIENT_STATUS.INACTIVE,
                'badge-outline-success':
                  getPatientStatus(programs) === PATIENT_STATUS.ACTIVE,
              })}
            >
              {getPatientStatus(programs)}
            </Badge>
          </Col>
          <Col xl={3} lg={6} className='mb-4 mb-xl-0'>
            <span
              className='lh-40 d-block mb-1 f-14'
              data-test={`patient-location-${key}`}
            >
              {getPatientLocationName(locationId)}
            </span>
            <h5 className='lh-25 mb-1 f-14 nunito'>
              <strong>DOB:</strong> {getFormattedDate(dateOfBirth)}
            </h5>
          </Col>
          <Col xl={3} lg={6} className='mb-4 mb-xl-0'>
            {programs?.map(({ id, name, isActive }) => (
              <div
                key={id}
                className='d-flex lh-25 align-items-center'
                data-test={`patient-program-${id}`}
              >
                <Indicator
                  variant={
                    isActive
                      ? INDICATOR_VARIANT.SUCCESS
                      : INDICATOR_VARIANT.WARNING
                  }
                >
                  {name}
                </Indicator>
              </div>
            ))}
          </Col>
          {/* PERMISSION:- Can READ/WRITE patient Details */}
          {isProvider && (
            <Col xl={2} lg={12} mb={4}>
              <Feature name='patientDetails'>
                <Button
                  variant='light'
                  className='btn-block btn-view-patient'
                  onClick={() => handlePatientView(id)}
                  data-test={`view-patient-button-${key}`}
                >
                  View Patient
                </Button>
              </Feature>
            </Col>
          )}
        </Row>
      </Card>
    )
  })
}

export default PatientArchive
