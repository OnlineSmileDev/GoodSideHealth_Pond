import React from 'react'
import { Card, Form, Button, Row, Col } from 'react-bootstrap'
import { Formik } from 'formik'
import { object as YupObject, string as YupString } from 'yup'
import { useDispatch } from 'react-redux'
import { updateUser } from '../Users'
import { useAuth0 } from '@auth0/auth0-react'
import classNames from 'classnames'
import { ALERT_TEXT } from './settings.constants'
import {
  FORBIDDEN,
  BAD_REQUEST,
} from '../../infrastructure/http/http.constants'

const PASSWORD_STRENGTH_ERROR = 'PasswordStrengthError'

const UpdatePassword = ({ setNotifyToggle, notifyToggle, user }) => {
  const dispatch = useDispatch()
  const { logout } = useAuth0()
  const validationSchema = YupObject().shape({
    currentPassword: YupString()
      .required('Current Password is Required')
      .min(8, 'Password must be of length more than 8'),
    newPassword: YupString()
      .required('New Password is Required')
      .min(8, 'Password must be of length more than 8')
      .test(
        'passwords-does-not-match',
        'New Password and Current Password can not be the same',
        function (value) {
          return this.parent.currentPassword !== value
        }
      ),
    confirmPassword: YupString()
      .required('Password Confirmation is Required')
      .min(8, 'Password must be of length more than 8')
      .test('passwords-match', 'Password does not match', function (value) {
        return this.parent.newPassword === value
      }),
  })

  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }

  const handleOnSubmit = (values, { setSubmitting, resetForm }) => {
    const { newPassword, currentPassword } = values
    dispatch(
      updateUser({
        id: user.id,
        updatedUser: {
          password: newPassword,
          currentPassword: currentPassword,
        },
      })
    ).then(({ payload }) => {
      const { code: statusCode, message } = payload
      if (statusCode) {
        setNotifyToggle({
          isError: true,
          text:
            statusCode === FORBIDDEN
              ? ALERT_TEXT.INCORRECT_PASSWORD_ERROR
              : statusCode === BAD_REQUEST &&
                message.includes(PASSWORD_STRENGTH_ERROR)
              ? ALERT_TEXT.WEAK_PASSWORD_ERROR
              : ALERT_TEXT.UPDATE_PASSWORD_ERROR,
          show: true,
        })
      } else {
        setNotifyToggle({
          isError: false,
          text: ALERT_TEXT.UPDATE_PASSWORD_SUCCESS,
          show: true,
        })

        logout({ returnTo: window.location.origin })
        resetForm()
        setSubmitting(false)
      }
    })
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Card className='shadow-sm border-0 mb-25'>
          <Card.Body className='p-20'>
            <Card.Title className='font-weight-bold gotham lh-25 d-block mb-20 f-18'>
              Update Password
            </Card.Title>
            <Form
              onSubmit={handleSubmit}
              onChange={() =>
                notifyToggle &&
                setNotifyToggle({ show: false, isError: false, text: '' })
              }
            >
              <Form.Group controlId='currentPassword'>
                <Row>
                  <Col md={4}>
                    <Form.Label className='f-14 font-weight-bold my-2'>
                      Current Password
                    </Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      type='password'
                      name='currentPassword'
                      placeholder='Input Password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.currentPassword}
                      className={classNames({
                        error:
                          touched.currentPassword && errors.currentPassword,
                      })}
                    />

                    {touched.currentPassword && errors.currentPassword && (
                      <div className='error-message'>
                        {errors.currentPassword}
                      </div>
                    )}
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId='newPassword'>
                <Row>
                  <Col md={4}>
                    <Form.Label className='f-14 font-weight-bold my-2'>
                      New Password
                    </Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      type='password'
                      name='newPassword'
                      placeholder='New Password'
                      onChange={handleChange}
                      value={values.newPassword}
                      onBlur={handleBlur}
                      className={classNames({
                        error: touched.newPassword && errors.newPassword,
                      })}
                    />
                    {touched.newPassword && errors.newPassword && (
                      <div className='error-message'>{errors.newPassword}</div>
                    )}
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className='mb-25' controlId='confirmPassword'>
                <Row>
                  <Col md={4}>
                    <Form.Label className='f-14 font-weight-bold my-2'>
                      Confirm New Password
                    </Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      type='password'
                      name='confirmPassword'
                      placeholder='Confirm New Password'
                      onChange={handleChange}
                      value={values.confirmPassword}
                      onBlur={handleBlur}
                      className={classNames({
                        error:
                          touched.confirmPassword && errors.confirmPassword,
                      })}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <div className='error-message'>
                        {errors.confirmPassword}
                      </div>
                    )}
                  </Col>
                </Row>
              </Form.Group>
              <Button variant='secondary' type='submit'>
                Save
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Formik>
  )
}

export default UpdatePassword
