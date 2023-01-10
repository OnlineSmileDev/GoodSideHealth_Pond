import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch } from 'components/atoms/Switch'
import { actions } from '../../widgets/Wizard/wizard.slice'
import { selectWizardFormValues } from '../../widgets/Wizard/wizard.selectors'
import { Form, Col, Row, Container } from 'react-bootstrap'
import { useFirstMount } from '../../hooks'
import { selectSelectedDischargeNoteModal } from '../VisitItem/visitItem.selectors'
import { INPUT_LIMIT } from '../../config'
import {
  DISCHARGE_NOTE_MODAL,
  DISCLAIMER,
} from './dischargeNoteModal.constants'

const { setIsCurrentPageValid, setFormValues } = actions
const columnLeftSizing = {
  xl: { span: 2, order: 1 },
  lg: { span: 2, order: 1 },
  sm: { span: 2, order: 1 },
  xs: { span: 2, order: 2 },
}
const columnRightSizing = {
  xl: { span: 10, order: 1 },
  lg: { span: 10, order: 1 },
  sm: { span: 10, order: 1 },
  xs: { span: 10, order: 2 },
}
const TOGGLE = {
  PHARMACY: 'pharmacy',
  ANTIBIOTICS: 'antibioticsPrescribed',
}

const TemporaryPharmacy = ({ visitDetailsPharmacyAddress }) => {
  const dispatch = useDispatch()
  const wizardForm = useSelector(selectWizardFormValues)
  const selectedModal = useSelector(selectSelectedDischargeNoteModal)
  const isFirstMount = useFirstMount()
  const isDischargeModal = selectedModal === DISCHARGE_NOTE_MODAL.PROVIDER

  const {
    pharmacyAddress,
    otherMedicationPrescribed,
    antibioticsPrescribed,
    medicationInformation,
  } = wizardForm

  useEffect(() => {
    if (isFirstMount && visitDetailsPharmacyAddress) {
      dispatch(
        setFormValues({
          ...wizardForm,
          pharmacyAddress: visitDetailsPharmacyAddress,
        })
      )
    }
  }, [isFirstMount, wizardForm, dispatch, visitDetailsPharmacyAddress])

  const [toggle, setToggle] = useState({
    pharmacy: Boolean(pharmacyAddress || visitDetailsPharmacyAddress),
    otherMedicationPrescribed: Boolean(otherMedicationPrescribed),
    antibioticsPrescribed: Boolean(antibioticsPrescribed),
  })

  const dischargeNoteToggle =
    toggle.otherMedicationPrescribed || toggle.antibioticsPrescribed

  const isDischargePharmacyPageValid =
    (isDischargeModal
      ? !toggle.otherMedicationPrescribed && !toggle.antibioticsPrescribed
      : !toggle.pharmacy) || pharmacyAddress

  useEffect(() => {
    if (isDischargePharmacyPageValid) dispatch(setIsCurrentPageValid(true))
    else dispatch(setIsCurrentPageValid(false))
  }, [dispatch, isDischargePharmacyPageValid])

  const togglePharmacyInput = (e) => {
    const name = e.target.name
    const checked = e.target.checked
    if (name === TOGGLE.PHARMACY && toggle.pharmacy) {
      dispatch(
        setFormValues({
          ...wizardForm,
          pharmacyAddress: '',
        })
      )
    } else {
      const resetInputs =
        (name === TOGGLE.ANTIBIOTICS
          ? !toggle.otherMedicationPrescribed
          : !toggle.antibioticsPrescribed) && !checked

      let medicationInformationInput = medicationInformation || DISCLAIMER
      const clearMedicationInformation =
        name === TOGGLE.ANTIBIOTICS ? !checked : !toggle.antibioticsPrescribed
      if (clearMedicationInformation) {
        medicationInformationInput = ''
      }

      if (resetInputs) {
        dispatch(
          setFormValues({
            ...wizardForm,
            [name]: !toggle[name],
            pharmacyAddress: '',
            medicationInformation: '',
          })
        )
      } else {
        dispatch(
          setFormValues({
            ...wizardForm,
            [name]: !toggle[name],
            pharmacyAddress: pharmacyAddress ?? '',
            medicationInformation: medicationInformationInput,
          })
        )
      }
    }
    setToggle({ ...toggle, [name]: !toggle[name] })
  }

  const handleChange = (field, value) => {
    dispatch(setFormValues({ ...wizardForm, [field]: value }))
  }

  return (
    <Container>
      {isDischargeModal ? (
        <>
          <Form.Group>
            <Row>
              <Col
                {...columnLeftSizing}
                className='p-0 d-flex justify-content-center'
              >
                <Form>
                  <Switch
                    checked={toggle.antibioticsPrescribed}
                    onChange={togglePharmacyInput}
                    ariaLabel={'prescribe-antibiotics-toggle'}
                    name={'antibioticsPrescribed'}
                  />
                </Form>
              </Col>
              <Col
                className='d-flex align-items-center pl-0'
                {...columnRightSizing}
              >
                <p className='f-14 font-weight-bold mb-0'>
                  I am prescribing antibiotics for this visit
                </p>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row>
              <Col
                {...columnLeftSizing}
                className='p-0 d-flex justify-content-center'
              >
                <Form>
                  <Switch
                    checked={toggle.otherMedicationPrescribed}
                    onChange={togglePharmacyInput}
                    ariaLabel={'prescribe-other-medications-toggle'}
                    name={'otherMedicationPrescribed'}
                  />
                </Form>
              </Col>
              <Col
                className='d-flex align-items-center pl-0'
                {...columnRightSizing}
              >
                <p className='f-14 font-weight-bold mb-0'>
                  I am prescribing a medication other than antibiotics
                </p>
              </Col>
            </Row>
          </Form.Group>
        </>
      ) : (
        <Form.Group>
          <Row>
            <Col
              {...columnLeftSizing}
              className='p-0 d-flex justify-content-center'
            >
              <Form>
                <Switch
                  checked={toggle.pharmacy}
                  onChange={togglePharmacyInput}
                  ariaLabel={'pharmacy-input-toggle'}
                  name={'pharmacy'}
                />
              </Form>
            </Col>
            <Col
              className='d-flex align-items-center pl-0'
              {...columnRightSizing}
            >
              <p className='f-14 mb-0'>
                Enter patient&apos;s preferred pharmacy details.
              </p>
            </Col>
          </Row>
        </Form.Group>
      )}
      {dischargeNoteToggle && (
        <Row>
          <Col
            {...columnLeftSizing}
            className='p-0 d-flex justify-content-center'
          />
          <Col className='pl-0' {...columnRightSizing}>
            <p className='f-14 mb-10'>
              Please submit the name and address of the pharmacy that will
              receive your script:
            </p>
          </Col>
        </Row>
      )}
      {(isDischargeModal ? dischargeNoteToggle : toggle.pharmacy) && (
        <Form.Group>
          <Row>
            <Col
              {...columnLeftSizing}
              className='p-0 d-flex justify-content-center'
            />
            <Col className='pl-0' {...columnRightSizing}>
              <Form.Control
                as='textarea'
                rows='2'
                placeholder='Input pharmacy name and address'
                value={pharmacyAddress}
                maxLength={INPUT_LIMIT.DEFAULT}
                onChange={(ev) =>
                  handleChange('pharmacyAddress', ev.target.value)
                }
              />
            </Col>
          </Row>
        </Form.Group>
      )}
      {dischargeNoteToggle && (
        <Form.Group>
          <Row>
            <Col
              {...columnLeftSizing}
              className='p-0 d-flex justify-content-center'
            />
            <Col className='pl-0' {...columnRightSizing}>
              <Form.Control
                as='textarea'
                placeholder='Please enter any additional information about the medication(s)'
                rows='5'
                value={medicationInformation}
                maxLength={INPUT_LIMIT.ADDITIONAL}
                onChange={(ev) =>
                  handleChange('medicationInformation', ev.target.value)
                }
              />
            </Col>
          </Row>
        </Form.Group>
      )}
    </Container>
  )
}
export default TemporaryPharmacy
