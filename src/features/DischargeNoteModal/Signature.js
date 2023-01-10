import React, { useState, useEffect, useRef } from 'react'
import { Row, Col, Form, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import SignatureCanvas from 'react-signature-canvas'
import { CustomDatePicker } from 'components/atoms/DatePicker'
import { Button } from 'components/atoms/Button'
import { TimeInput } from 'components/molecules/TimeInput'
import { USER_ROLES } from 'constants/users'
import { getFormattedTime } from 'utils/getFormattedTime'
import {
  getFormattedDate,
  formattedDateWithFullMonthAndYear,
} from 'utils/datePicker'
import { isEmpty } from 'utils/isEmpty'
import Icons from '../../assets/icons'
import { actions } from '../../widgets/Wizard/wizard.slice'
import { selectWizardFormValues } from '../../widgets/Wizard/wizard.selectors'
import { selectUserDetails } from '../Users/users.selectors'
import { selectCurrentUserHasPermissions } from '../../infrastructure/userContext'
import { selectSelectedModal } from '../ScreeningDataDashboard/screeningDataDashboard.selectors'
import { SELECTED_MODAL } from '../ScreeningDataDashboard/screeningDataDashboard.constants'
import { useFirstMount } from '../../hooks'

const { setIsCurrentPageValid, setFormValues } = actions

const Signature = () => {
  const userDetails = useSelector(selectUserDetails)
  const sigCanvas = useRef({})
  const dispatch = useDispatch()
  const wizardForm = useSelector(selectWizardFormValues)
  const selectedModal = useSelector(selectSelectedModal)
  const isTestResult =
    selectedModal === SELECTED_MODAL.TEST_RESULT ||
    selectedModal === SELECTED_MODAL.EDIT_TEST_RESULT

  const today = new Date()
  const [date, setDate] = useState(today)
  const [time, setTime] = useState(today)
  const currentUserHasPermissions = useSelector(selectCurrentUserHasPermissions)
  const isProvider = currentUserHasPermissions([USER_ROLES.PROVIDER])
  const isFirstMount = useFirstMount()

  const [checkInstructions, setCheckInststructions] = useState(false)

  // TODO: Replace role check with extraction of role and using it to fetch role specific values like we did for session logs
  const signatureDateTime = isProvider
    ? 'providerSignatureDateTime'
    : 'facilitatorSignatureDateTime'

  // TODO: Replace role check with extraction of role and using it to fetch role specific values like we did for session logs
  const userSignature = isProvider
    ? 'providerSignature'
    : 'facilitatorSignature'
  const isValid = isTestResult
    ? checkInstructions && wizardForm.signature && wizardForm.signatureDateTime
    : checkInstructions &&
      wizardForm[userSignature] &&
      wizardForm[signatureDateTime]

  const savedSignature = isTestResult
    ? wizardForm.signature
    : wizardForm[userSignature]

  useEffect(() => {
    isValid
      ? dispatch(setIsCurrentPageValid(true))
      : dispatch(setIsCurrentPageValid(false))
    if (isTestResult) {
      if (wizardForm.signature !== null && isFirstMount) {
        sigCanvas.current.fromDataURL(savedSignature)
      }
    } else {
      if (wizardForm[userSignature] !== null && isFirstMount) {
        sigCanvas.current.fromDataURL(savedSignature)
      }
    }
  }, [
    dispatch,
    isValid,
    savedSignature,
    userSignature,
    wizardForm,
    isFirstMount,
    isTestResult,
  ])

  const saveSignature = () => {
    if (sigCanvas) {
      const signature = sigCanvas.current.getCanvas().toDataURL('image/png')
      isTestResult
        ? dispatch(setFormValues({ signature: signature }))
        : dispatch(setFormValues({ [userSignature]: signature }))
      // I converted this to an ISO string to get rid of a warning, but this may be a bad move. Feel free to remove that!
      isTestResult
        ? dispatch(setFormValues({ signatureDateTime: today.toISOString() }))
        : dispatch(setFormValues({ [signatureDateTime]: today.toISOString() }))
    }
  }
  const resetSignature = () => {
    if (sigCanvas) {
      sigCanvas.current.clear()
      isTestResult
        ? dispatch(setFormValues({ signature: '' }))
        : dispatch(setFormValues({ [userSignature]: '' }))
    }
  }
  return (
    <Form className='p-20'>
      <Form.Group controlId='signature'>
        <Row>
          <Col md={4}>
            <Form.Label className='f-12 font-weight-bold my-2'>
              Draw Your Signature
            </Form.Label>
          </Col>
          <Col md={8}>
            {savedSignature ? (
              <Button
                size='none'
                className='tw-absolute tw-right-4 tw-max-h-4 tw-opacity-60 tw-z-10 hover:tw-opacity-100'
                onClick={resetSignature}
              >
                <Image src={Icons.closeIconBlack} width='20' alt='clearIcon' />
              </Button>
            ) : null}
            <SignatureCanvas
              ref={sigCanvas}
              onEnd={saveSignature}
              penColor='black'
              canvasProps={{
                className: 'signatureCanvas',
                tabIndex: '0',
                'aria-label': 'Draw your Signature',
              }}
              clearOnResize={false}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId='firstName'>
        <Row>
          <Col md={4}>
            <Form.Label className='f-12 font-weight-bold my-2'>
              FirstName
            </Form.Label>
          </Col>
          <Col md={8}>
            <Form.Control
              type='text'
              name='firstName'
              placeholder='Your FirstName'
              value={userDetails.firstName}
              className='read-only-input'
              readOnly
            ></Form.Control>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId='lastName'>
        <Row>
          <Col md={4}>
            <Form.Label className='f-12 font-weight-bold my-2'>
              LastName
            </Form.Label>
          </Col>
          <Col md={8}>
            <Form.Control
              type='text'
              name='lastName'
              placeholder='Your LastName'
              value={userDetails.lastName}
              className='read-only-input'
              readOnly
            ></Form.Control>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId='credentials'>
        <Row>
          <Col md={4}>
            <Form.Label className='f-12 font-weight-bold my-2'>
              Credentials
            </Form.Label>
          </Col>
          <Col md={8}>
            <Form.Control
              type='text'
              name='credentials'
              placeholder='Your Credentials'
              value={userDetails.credentials}
              className='read-only-input'
              readOnly
            ></Form.Control>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group controlId='date'>
        <Row>
          <Col md={4}>
            <Form.Label className='nunito f-12 font-weight-bold my-2'>
              Date
            </Form.Label>
          </Col>
          <Col md={8}>
            {isTestResult ? (
              <h5 className='mb-0 f-14 lh-25'>
                {isEmpty(wizardForm.signatureDateTime)
                  ? formattedDateWithFullMonthAndYear(date)
                  : getFormattedDate(wizardForm.signatureDateTime)}
              </h5>
            ) : (
              <CustomDatePicker
                date={date}
                formattedDate={getFormattedDate(date)}
                setDate={(value) => {
                  setDate(value)
                }}
              />
            )}
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId='time'>
        <Row>
          <Col md={4}>
            <Form.Label className='f-12 font-weight-bold my-2'>Time</Form.Label>
          </Col>
          <Col md={8}>
            {isTestResult ? (
              <h5 className='mb-0 f-14 lh-25'>
                {isEmpty(wizardForm.signatureDateTime)
                  ? getFormattedTime(time)
                  : getFormattedTime(wizardForm.signatureDateTime)}
              </h5>
            ) : (
              <TimeInput
                time={time}
                setTime={(value) => {
                  setTime(value)
                }}
              />
            )}
          </Col>
        </Row>
      </Form.Group>

      <Form.Group controlId='informationCheck'>
        <div className='custom-checkbox d-block mb-2'>
          <label>
            <input
              type='checkbox'
              name=''
              onChange={() => setCheckInststructions(!checkInstructions)}
            />
            <span className='hind font-weight-bold f-14'>
              I certify that the information I have provided is truthful and
              accurate to the best of my knowledge
            </span>
          </label>
        </div>
      </Form.Group>
    </Form>
  )
}
export default Signature
