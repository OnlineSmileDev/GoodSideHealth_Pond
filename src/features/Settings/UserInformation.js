import React from 'react'
import { Card, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import { object as YupObject, string as YupString, date as YupDate } from 'yup'
import classNames from 'classnames'
import moment from 'moment'
import { useFeatures } from 'flagged'
import { CustomDatePicker } from 'components/atoms/DatePicker'
import { Switch } from 'components/atoms/Switch'
import {
  CREDENTIALS,
  FACILITATOR_CREDENTIALS,
  USER_ROLES,
} from 'constants/users'
import { getFormattedDate, getBackendFormattedDate } from 'utils/datePicker'
import { isEqual } from 'utils/isEqual'
import {
  getFormattedPhoneNumber,
  getNumberFromString,
} from 'utils/getFormattedNumber'
import { updateUser } from '../Users'
import { ALERT_TEXT } from './settings.constants'
import { selectCurrentUserHasPermissions } from '../../infrastructure/userContext'

const UserInformation = ({
  setNotifyToggle,
  notifyToggle,
  refetch,
  user,
  locations,
}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const currentUserHasPermissions = useSelector(selectCurrentUserHasPermissions)
  const isNurse = currentUserHasPermissions([USER_ROLES.NURSE])
  const isProvider = currentUserHasPermissions([USER_ROLES.PROVIDER])
  const { queueSoundNotification } = useFeatures()

  // PERMISSION:- Can change user default locations
  const formattedCredentials = isNurse
    ? [...CREDENTIALS, ...FACILITATOR_CREDENTIALS]
    : CREDENTIALS

  const validationSchema = YupObject().shape({
    firstName: YupString().required('First Name is required'),
    lastName: YupString().required('Last Name is required'),
    phoneNumber: YupString()
      .min(10, 'Phone number should be of 10 characters')
      .max(10, 'Phone number should be of 10 characters'),
    dateOfBirth: YupDate()
      .max(
        new Date(),
        `dateOfBirth field must be at earlier than ${String(
          moment().format('YYYY-MM-DD')
        )}`
      )
      .nullable(),
  })
  const initialValues = {
    prefix: user.prefix,
    firstName: user.firstName,
    lastName: user.lastName,
    credentials: user.credentials,
    email: user.email,
    phoneNumber: getNumberFromString(user.phoneNumber),
    dateOfBirth: user.dateOfBirth,
    defaultLocationId: user.defaultLocationId,
    doNotificationsEnabled: user.doNotificationsEnabled,
  }
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const updatedUser = {
          prefix: values.prefix || '',
          credentials: values.credentials || '',
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: getFormattedPhoneNumber(values.phoneNumber),
          defaultLocationId: parseInt(values.defaultLocationId) || 0,
          dateOfBirth: values.dateOfBirth || null,
          doNotificationsEnabled: values.doNotificationsEnabled,
        }
        dispatch(
          updateUser({
            updatedUser,
            id: user.id,
          })
        ).then((res) => {
          if (res.payload) {
            setNotifyToggle({
              isError: false,
              text: ALERT_TEXT.UPDATE_INFORMATION_SUCCESS,
              show: true,
            })
          } else {
            setNotifyToggle({
              isError: true,
              text: ALERT_TEXT.UPDATE_INFORMATION_ERROR,
              show: true,
            })
          }
          refetch()
          setSubmitting(false)
        })
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <Card className='shadow-sm border-0 mb-30'>
          <Card.Body className='p-20'>
            <Card.Title className='font-weight-bold gotham lh-25 d-block mb-20 f-18'>
              Your Information
            </Card.Title>
            <Form
              onSubmit={handleSubmit}
              onChange={() =>
                notifyToggle &&
                setNotifyToggle({ show: false, isError: false, text: '' })
              }
            >
              <Form.Group controlId='prefix'>
                <Row className='mb-10'>
                  <Col md={5}>
                    <Form.Label className='f-14 font-weight-bold my-2'>
                      Your Prefix
                    </Form.Label>
                  </Col>
                  <Col md={7}>
                    <Form.Control
                      as='select'
                      name='prefix'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.prefix}
                      className={classNames('pendo-settings-prefix-dropdown', {
                        error: touched.prefix && errors.prefix,
                      })}
                    >
                      <option value=''>Select Prefix</option>
                      <option value='Mr'>Mr</option>
                      <option value='Mrs'>Mrs</option>
                      <option value='Ms'>Ms</option>
                      <option value='Dr'>Dr</option>
                    </Form.Control>
                    {touched.prefix && errors.prefix && (
                      <div className='error-message'>{errors.prefix}</div>
                    )}
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId='firstName'>
                <Row className='mb-10'>
                  <Col md={5}>
                    <Form.Label className='f-14 font-weight-bold my-2'>
                      First Name
                    </Form.Label>
                  </Col>
                  <Col md={7}>
                    <Form.Control
                      type='text'
                      name='firstName'
                      onChange={handleChange}
                      value={values.firstName}
                      onBlur={handleBlur}
                      className={classNames(
                        'pendo-settings-first-name-text-input',
                        {
                          error: touched.firstName && errors.firstName,
                        }
                      )}
                    />
                    {touched.firstName && errors.firstName && (
                      <div className='error-message'>{errors.firstName}</div>
                    )}
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId='lastName'>
                <Row className='mb-10'>
                  <Col md={5}>
                    <Form.Label className='f-14 font-weight-bold my-2'>
                      Last Name
                    </Form.Label>
                  </Col>
                  <Col md={7}>
                    <Form.Control
                      type='text'
                      name='lastName'
                      onChange={handleChange}
                      value={values.lastName}
                      onBlur={handleBlur}
                      className={classNames(
                        'pendo-settings-last-name-text-input',
                        {
                          error: touched.lastName && errors.lastName,
                        }
                      )}
                    />
                    {touched.lastName && errors.lastName && (
                      <div className='error-message'>{errors.lastName}</div>
                    )}
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId='credentials'>
                <Row className='mb-10'>
                  <Col md={5}>
                    <Form.Label className='f-14 font-weight-bold my-2'>
                      Your Credentials
                    </Form.Label>
                  </Col>
                  <Col md={7}>
                    <Form.Control
                      as='select'
                      name='credentials'
                      onChange={handleChange}
                      value={values.credentials}
                      onBlur={handleBlur}
                      className={classNames(
                        'pendo-settings-credentials-dropdown',
                        {
                          error: touched.credentials && errors.credentials,
                        }
                      )}
                    >
                      <option value=''>Select Credential</option>
                      {formattedCredentials.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                      {/* TODO Need to update with exact credentials */}
                      {touched.credentials && errors.credentials && (
                        <div className='error-message'>
                          {errors.credentials}
                        </div>
                      )}
                    </Form.Control>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId='email'>
                <Row className='mb-10'>
                  <Col md={5}>
                    <Form.Label className='f-14 font-weight-bold my-2'>
                      Your Email Address
                    </Form.Label>
                  </Col>
                  <Col md={7}>
                    <Form.Control
                      type='text'
                      name='email'
                      placeholder='Email Address'
                      value={values.email}
                      className='pendo-settings-email-address-text-input read-only-input'
                      readOnly
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId='phoneNumber'>
                <Row className='mb-10'>
                  <Col md={5}>
                    <Form.Label className='f-14 font-weight-bold my-2'>
                      Your Phone Number
                    </Form.Label>
                  </Col>
                  <Col md={7}>
                    <Form.Control
                      type='number'
                      name='phoneNumber'
                      placeholder='Phone Number'
                      onChange={handleChange}
                      value={values.phoneNumber}
                      onBlur={handleBlur}
                      className={classNames(
                        'pendo-settings-phone-number-text-input',
                        {
                          error: touched.phoneNumber && errors.phoneNumber,
                        }
                      )}
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                      <div className='error-message'>{errors.phoneNumber}</div>
                    )}
                  </Col>
                </Row>
              </Form.Group>
              {/* Todo : Undo Changes when DatePicker year is adjusted according to UX needs */}
              {/* <Form.Group controlId='dateOfBirth'>
                <Row>
                  <Col md={5}>
                    <Form.Label className='f-14 font-weight-bold my-2'>
                      Your Date of Birth
                    </Form.Label>
                  </Col>
                  <Col
                    md={7}
                    className='pendo-settings-date-of-birth-datepicker-col'
                  >
                    <CustomDatePicker
                      date={values.dateOfBirth}
                      formattedDate={getFormattedDate(values.dateOfBirth)}
                      setDate={(value) =>
                        setFieldValue(
                          'dateOfBirth',
                          getBackendFormattedDate(value)
                        )
                      }
                    />
                    {touched.dateOfBirth && errors.dateOfBirth && (
                      <div className='error-message'>{errors.dateOfBirth}</div>
                    )}
                  </Col>
                </Row>
              </Form.Group> */}
              {/* PERMISSION:- Can change user default locations */}
              {isNurse && (
                <Form.Group controlId='defaultLocationId'>
                  <Row className='mb-10'>
                    <Col md={5}>
                      <Form.Label className='f-14 font-weight-bold my-2'>
                        Default Location
                      </Form.Label>
                    </Col>
                    <Col md={7}>
                      <Form.Control
                        as='select'
                        name='defaultLocationId'
                        onChange={handleChange}
                        value={values.defaultLocationId}
                        onBlur={handleBlur}
                        className={classNames(
                          'pendo-settings-default-location-dropdown read-only-input',
                          {
                            error:
                              touched.defaultLocationId &&
                              errors.defaultLocationId,
                          }
                        )}
                      >
                        <option className='pendo-settings-location-default-option'>
                          Select Default Location
                        </option>
                        {locations.map(({ name, id }) => (
                          <option
                            key={name}
                            value={id}
                            className={`pendo-settings-location-${name}-option`}
                          >
                            {name}
                          </option>
                        ))}
                        {touched.defaultLocationId &&
                          errors.defaultLocationId && (
                            <div className='error-message'>
                              {errors.defaultLocationId}
                            </div>
                          )}
                      </Form.Control>
                    </Col>
                  </Row>
                </Form.Group>
              )}
              {queueSoundNotification && isProvider && (
                // PERMISSION:- Can Edit Queue Notifications
                <Form.Group controlId='doNotificationsEnabled'>
                  <Row className='mb-10'>
                    <Col md={5}>
                      <Form.Label className='pendo-settings-queue-sound-notification-toggle f-14 font-weight-bold my-2'>
                        Queue Notification Sound
                      </Form.Label>
                    </Col>
                    <Col md={7}>
                      <Switch
                        checked={values.doNotificationsEnabled}
                        onChange={handleChange}
                        name='doNotificationsEnabled'
                      />
                    </Col>
                  </Row>
                </Form.Group>
              )}
              <Button
                disabled={isEqual(initialValues, values)}
                variant='secondary'
                type='submit'
                className='pendo-settings-save-button'
              >
                Save
              </Button>
              <Button
                variant='light'
                type='button'
                className='ml-2 pendo-settings-cancel-button'
                onClick={() => {
                  router.push('/')
                }}
              >
                Cancel
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Formik>
  )
}

export default UserInformation
