import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Card, Row, Col, Form, Button, Image } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { Stepper } from 'components/molecules/Stepper'
import NumberFormat from 'react-number-format'
import { LABEL_POSITIONS } from 'constants/general'
import IMAGES from '../../assets/images'
import Icon from '../../assets/icons'
import { createUser, fetchUserEnrollmentDetails } from './users.asyncActions'
import {
  selectUserDetails,
  selectUserEnrollmentDetails,
} from './users.selectors'
import { getNamedBusyIndicator } from '../../widgets/busyIndicator/busyIndicator.selectors'

export default function Onboarding() {
  const router = useRouter()
  const dispatch = useDispatch()

  const [enrollmentId, setEnrollmentId] = useState()

  useEffect(() => {
    if (router.isReady) {
      if (!router.query.enrollmentId) return router.push('/404')
      setEnrollmentId(router.query.enrollmentId)
    }
  }, [router, enrollmentId])

  const {
    id,
    approved,
    firstName: userFirstName,
  } = useSelector(selectUserDetails)
  const { role, program } = useSelector(selectUserEnrollmentDetails)
  const show = useSelector(getNamedBusyIndicator('FETCH_USER'))

  useEffect(() => {
    if (enrollmentId) dispatch(fetchUserEnrollmentDetails({ id: enrollmentId }))
  }, [dispatch, enrollmentId])

  const [currentPage, setCurrentPage] = useState(1)

  const [{ firstName, lastName, phoneNumber }, setAccountValues] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  })
  const handleChange = ({ target: { name, value } }) =>
    setAccountValues((prevState) => ({ ...prevState, [name]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (firstName && lastName && phoneNumber) {
      const newUser = {
        firstName,
        lastName,
        phoneNumber,
        enrollmentId,
      }
      dispatch(createUser({ id, newUser }))
    }
  }

  useEffect(() => {
    if (id) {
      setCurrentPage(3)
    }
    if (!id) {
      setCurrentPage(2)
    }
  }, [id])

  const pages = [
    { label: 'Registration' },
    { label: 'Create Account' },
    { label: 'Approval' },
  ]

  if (approved) router.push('/')

  return (
    <>
      <div className='container-div'>
        <Container className='onboarding-container'>
          <Row className='onboarding-row-stepper'>
            <Stepper
              pages={pages}
              activeStep={currentPage}
              labelPosition={LABEL_POSITIONS.TOP}
            />
          </Row>
          <Row
            style={{
              maxHeight: 500,
            }}
          >
            <Col className='p-0' sm={4}>
              <Image
                src={IMAGES.labImage}
                alt='lab-image'
                height='100%'
                width='100%'
                style={{
                  maxHeight: 500,
                }}
              />
            </Col>
            <Col className='p-0' sm={8}>
              <Card
                style={{
                  height: '100%',
                }}
              >
                <Card.Body className='pl-5'>
                  <Row
                    style={{
                      margin: '50px 0 30px 0',
                    }}
                  >
                    <Col className='d-flex align-items-center justify-content-center'>
                      <Image
                        src={IMAGES.logo}
                        alt='lab-image'
                        width='100%'
                        style={{
                          maxWidth: 300,
                        }}
                      />
                    </Col>
                  </Row>
                  {/* i conditionally rendered here, but we could make each page a component */}
                  {!show && currentPage === 2 && (
                    <>
                      <Row className='mb-2'>
                        <h3 className='f-18 font-weight-bold'>
                          Create Account
                        </h3>
                      </Row>
                      {/* TODO: Make dynamic */}
                      <Row>
                        <p className='f-12'>
                          You are registering as a {role} for {program?.name}:
                        </p>
                      </Row>
                      <Form noValidate onSubmit={handleSubmit} method='post'>
                        <Form.Group>
                          <Row>
                            <Col
                              sm={4}
                              className='p-0 d-flex align-items-center'
                            >
                              <Form.Label className='f-12 m-0'>
                                First Name
                              </Form.Label>
                            </Col>
                            <Col sm={8}>
                              <Form.Control
                                type='text'
                                name='firstName'
                                value={firstName}
                                placeholder='First Name'
                                onChange={handleChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group>
                          <Row>
                            <Col
                              sm={4}
                              className='p-0 d-flex align-items-center'
                            >
                              <Form.Label className='f-12 m-0'>
                                Last Name
                              </Form.Label>
                            </Col>
                            <Col sm={8}>
                              <Form.Control
                                type='text'
                                name='lastName'
                                value={lastName}
                                placeholder='Last Name'
                                onChange={handleChange}
                              />
                            </Col>
                          </Row>
                          <Form.Group></Form.Group>

                          <Row className='mb-4'>
                            <Col
                              sm={4}
                              className='p-0 d-flex align-items-center'
                            >
                              <Form.Label className='f-12 m-0'>
                                Your Phone Number
                              </Form.Label>
                            </Col>
                            <Col sm={8}>
                              <NumberFormat
                                required
                                className='form-control'
                                name='phoneNumber'
                                format='(###) ###-####'
                                pattern='^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$'
                                placeholder='(XXX) XXX-XXXX'
                                onValueChange={(e) =>
                                  handleChange({
                                    target: {
                                      name: 'phoneNumber',
                                      value: e.formattedValue,
                                    },
                                  })
                                }
                              />
                            </Col>
                          </Row>
                        </Form.Group>

                        <Row className='d-flex justify-content-end mr-1'>
                          <Button
                            disabled={!phoneNumber || !firstName || !lastName}
                            type='submit'
                          >
                            Create Account
                          </Button>
                        </Row>
                      </Form>
                    </>
                  )}
                  {!show && currentPage === 3 && (
                    <>
                      <Row className='mb-5'>
                        <Col className='d-flex justify-content-center spacer'>
                          <Image
                            src={Icon.email}
                            alt='email-icon'
                            width='100%'
                          />
                        </Col>
                      </Row>
                      <Row
                        style={{
                          marginBottom: 30,
                        }}
                      >
                        <Col>
                          <h3 className='f-16 font-weight-bold text-align-center align-center'>
                            Hey {userFirstName}, thank you for completing the
                            steps to register!
                          </h3>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p className='f-12 d-flex text-align-center align-center'>
                            Please wait for your account to be approved. You
                            will receive an email confirmation once your account
                            has been approved.
                          </p>
                        </Col>
                      </Row>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
