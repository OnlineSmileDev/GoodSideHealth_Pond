import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { Nav, Row, Col, Button, Image, Container } from 'react-bootstrap'
import {
  Notification,
  NOTIFICATION_VARIANT,
} from 'components/atoms/Notification'
import { isEmpty } from 'utils/isEmpty'
import Icons from '../../assets/icons'
import PatientNavItems from './PatientNavItems'
import { selectPatientDetails } from './patientItem.selectors'
import {
  NAV_ITEMS,
  DETAILS_TYPE,
  NOTIFICATION_TEXT,
} from './patientItem.constants'
import {
  fetchPatientDetails,
  fetchLocations,
  fetchOrganizations,
} from './patientItem.asyncActions'

const PatientItem = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  const patientDetails = useSelector(selectPatientDetails)
  const [activeNavItem, setActiveNavItem] = useState(
    DETAILS_TYPE.PATIENT_DETAILS
  )
  const [notification, setNotification] = useState({
    show: false,
    isError: false,
    text: '',
  })
  const { patientFirstName, patientLastName, organizationId } = patientDetails
  const { DANGER, SUCCESS } = NOTIFICATION_VARIANT

  useEffect(() => {
    if (organizationId) dispatch(fetchLocations({ organizationId }))
  }, [dispatch, organizationId])

  useEffect(() => {
    dispatch(fetchPatientDetails({ patientId: id }))
    dispatch(fetchOrganizations())
  }, [dispatch, id])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (
      notification.show &&
      notification.text !== NOTIFICATION_TEXT.VALIDATION_ERROR
    ) {
      setTimeout(() => {
        setNotification({ show: false, isError: false, text: '' })
      }, 3000)
    }
  }, [notification])

  const handleSelect = (eventKey) => setActiveNavItem(eventKey)

  return (
    !isEmpty(patientDetails) && (
      <Container fluid>
        {notification.show && (
          <div className='tw-pt-6'>
            <Notification
              message={notification.text}
              variant={notification.isError ? DANGER : SUCCESS}
            />
          </div>
        )}
        <div className='d-flex py-30 align-items-center'>
          <h2
            className='f-28 font-weight-bold lh-40 mb-0'
            data-test='patient-details-name'
          >
            {`${patientFirstName} ${patientLastName}`}
          </h2>

          <Button className='p-0 ml-auto btn-auto' variant='link'>
            <Image src={Icons.circleButtonIcon} alt='circle-button-icon' />
          </Button>
        </div>

        <Row>
          <Col lg={4} xl={3}>
            <Nav
              className='flex-column bg-white mb-30 rounded overflow-hidden shadow-sm vertical-tabs'
              variant='pills'
              defaultActiveKey={activeNavItem}
              onSelect={handleSelect}
            >
              {Object.entries(NAV_ITEMS).map(([key, value]) => (
                <Nav.Item key={key}>
                  <Nav.Link
                    id={`tab-${key}`}
                    className='rounded-0 p-20 f-14 hind font-weight-bold'
                    eventKey={key}
                  >
                    {value}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>

          <Col lg={8} xl={9}>
            <PatientNavItems
              activeNavItem={activeNavItem}
              details={patientDetails}
              patientId={id}
              setNotification={setNotification}
            />
          </Col>
        </Row>
      </Container>
    )
  )
}
export default PatientItem
