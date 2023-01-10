import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Image } from 'react-bootstrap'
import { useRouter } from 'next/router'
import FormGroup from 'components/molecules/FormGroup'
import ModalFooter from 'components/molecules/ModalFooter'
import { Label } from 'components/atoms/Label'
import { Button } from 'components/atoms/Button'
import { VISITS_STATUS } from 'constants/visits'
import { getFormattedDate } from 'utils/datePicker'
import { getFormattedTime } from 'utils/getFormattedTime'
import { actions as action } from '../VisitItem/visitItem.slice'
import SignatureCanvas from 'react-signature-canvas'
import { selectUserDetails } from '../Users/users.selectors'
import Modal, { hideModal, showModal } from '../../widgets/modal'
import { selectVisitDetails } from '../VisitItem/visitItem.selectors'
import { DEFAULT_FIELD_VALUES } from '../VisitItem/visitItem.constants'
import { updateVisit } from '../VisitItem/visitItem.asyncActions'
import Icons from '../../assets/icons'

const { setSelectedVisitItemModal } = action

const EndVisitModal = () => {
  const router = useRouter()
  const userDetails = useSelector(selectUserDetails)
  const sigCanvas = useRef({})
  const dispatch = useDispatch()
  const resetModal = () => dispatch(setSelectedVisitItemModal(null))
  const today = new Date()
  const date = getFormattedDate(today)
  const time = getFormattedTime(today)
  const [checkInstructions, setCheckInststructions] = useState(false)
  const [aprrovalCheck, setApprovalCheck] = useState(true)
  const selectedVisit = useSelector(selectVisitDetails)
  const { visitMetadata } = selectedVisit
  const [visitData, setVisitData] = useState({})
  const isValid =
    (checkInstructions && aprrovalCheck && visitData.providerSignature) ||
    (checkInstructions &&
      visitData.providerSignature &&
      visitData.testDeniedReason)
  const { firstName, lastName, credentials } = userDetails

  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])

  const handleClose = () => {
    dispatch(hideModal())
    resetModal()
  }

  const handleClick = () => {
    const { providerNotes, reviewOfSystems, physicalExam } =
      selectedVisit.visitMetadata

    const updatedVisit = {
      status: VISITS_STATUS.ENDED,
      date: new Date(),
      visitMetadata: {
        ...visitMetadata,
        ...visitData,
        reviewOfSystems: !reviewOfSystems
          ? DEFAULT_FIELD_VALUES.reviewOfSystems
          : reviewOfSystems,
        physicalExam: !physicalExam
          ? DEFAULT_FIELD_VALUES.physicalExam
          : physicalExam,
        providerNotes: !providerNotes
          ? DEFAULT_FIELD_VALUES.providerNotes
          : providerNotes,
        documentedEmr: !!visitMetadata.documentedEmr,
        patientNotified: !!visitMetadata.patientNotified,
      },
    }

    if (!aprrovalCheck) {
      updatedVisit.status = VISITS_STATUS.TEST_DENIED
    }
    dispatch(updateVisit({ visitId: selectedVisit.id, updatedVisit })).then(
      () => {
        handleClose()
        router.push(`/sessions/${selectedVisit.sessionId}`)
      }
    )
  }

  const saveSignature = () => {
    if (sigCanvas) {
      const signature = sigCanvas.current.getCanvas().toDataURL('image/png')
      setVisitData({
        ...visitData,
        providerSignature: signature,
        providerSignatureDateTime: today.toISOString(),
      })
    }
  }

  const resetSignature = () => {
    if (sigCanvas) {
      sigCanvas.current.clear()
      setVisitData({ ...visitData, providerSignature: '' })
    }
  }

  const footer = (
    <ModalFooter
      submitButtonProps={{
        onClick: handleClick,
        disabled: !isValid,
        buttonText: 'Finalize for Testing',
        className:
          'btn-lg pendo-session-visit-finalize-submit-button e2e-session-visit-finalize-submit-button',
        'data-test': 'finalize-submit-button',
      }}
      cancelButtonProps={{ onClick: handleClose }}
    />
  )

  return (
    <>
      <Modal
        title='Finalize for Testing'
        reset={resetModal}
        footer={footer}
        size='lg'
        onClose={false}
      >
        <Form className='py-20'>
          <Form.Group controlId='signature'>
            <Row>
              <Col md={4}>
                <Label htmlFor='signature'>Draw Your Signature</Label>
              </Col>
              <Col md={8}>
                {visitData.providerSignature ? (
                  <Button
                    size='none'
                    className='tw-absolute tw-right-4 tw-max-h-4 tw-opacity-60 tw-z-10 hover:tw-opacity-100'
                    onClick={resetSignature}
                  >
                    <Image
                      src={Icons.closeIconBlack}
                      width='20'
                      alt='clearIcon'
                    />
                  </Button>
                ) : null}
                <SignatureCanvas
                  ref={sigCanvas}
                  onEnd={saveSignature}
                  penColor='black'
                  canvasProps={{
                    height: 150,
                    width: 550,
                    className: 'signatureCanvas',
                  }}
                  clearOnResize={false}
                />
              </Col>
            </Row>
          </Form.Group>
          <FormGroup
            label='FirstName'
            name='firstName'
            inputProps={{
              type: 'text',
              placeholder: 'Your FirstName',
              className: 'read-only-input',
              readOnly: true,
              value: firstName,
            }}
          />
          <FormGroup
            label='LastName'
            name='lastName'
            inputProps={{
              type: 'text',
              placeholder: 'Your LastName',
              className: 'read-only-input',
              readOnly: true,
              value: lastName,
            }}
          />
          <FormGroup
            label='Credentials'
            name='credentials'
            inputProps={{
              type: 'text',
              placeholder: 'Your Credentials',
              className: 'read-only-input',
              readOnly: true,
              value: credentials,
            }}
          />
          <Form.Group controlId='date'>
            <Row>
              <Col md={4}>
                <Form.Label className='nunito f-12 font-weight-bold my-2'>
                  Date
                </Form.Label>
              </Col>
              <Col md={8}>
                <h5 className='mb-0 f-14 lh-25'>{date}</h5>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId='time'>
            <Row>
              <Col md={4}>
                <Label htmlFor='time'>Time</Label>
              </Col>
              <Col md={8}>
                <h5 className='mb-0 f-14 lh-25'>{time}</h5>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId='informationCheck'>
            <div className='custom-checkbox d-block mb-2'>
              <label>
                <input
                  type='checkbox'
                  name='informationCheck'
                  className='d-none'
                  onChange={() => setCheckInststructions(!checkInstructions)}
                />
                <span className='hind font-weight-bold f-14'>
                  I certify that the information I have provided is truthful and
                  accurate to the best of my knowledge
                </span>
              </label>
            </div>
          </Form.Group>
          <Form.Group controlId='aprrovalCheck'>
            <div className='custom-checkbox d-block mb-2'>
              <label>
                <input
                  type='checkbox'
                  checked={aprrovalCheck}
                  name='approvalCheck'
                  className='d-none'
                  onChange={() => setApprovalCheck(!aprrovalCheck)}
                />
                <span className='hind font-weight-bold f-14'>
                  I approve this patient for the test as described in the
                  Provider Orders of this visit
                </span>
              </label>
            </div>
          </Form.Group>
          {!aprrovalCheck && (
            <Form.Group className='ml-35' controlId='test-denied'>
              <div className='row'>
                <div className='col-md-9'>
                  <textarea
                    className='form-control mb-20'
                    id='test-denied'
                    cols='15'
                    rows='9'
                    placeholder='Please add the reason this patient was not approved for the described test...'
                    onChange={(e) =>
                      setVisitData({
                        ...visitData,
                        testDeniedReason: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </Form.Group>
          )}
        </Form>
      </Modal>
    </>
  )
}
export default EndVisitModal
