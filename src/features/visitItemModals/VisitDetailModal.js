import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap'
import ModalFooter from 'components/molecules/ModalFooter'
import { USER_ROLES } from 'constants/users'
import Modal, { hideModal, showModal } from '../../widgets/modal'
import TemporaryPharmacy from '../DischargeNoteModal/TemporaryPharmacy'
import {
  // selectPatientVisitDetails,
  selectVisitDetails,
} from '../VisitItem/visitItem.selectors'
import {
  updateVisit,
  updateDischargeVisit,
  mockVisitReasons,
} from '../VisitItem/visitItem.asyncActions'
import { CustomSelectInput } from 'components/molecules/CustomSelectInput'
import { fetchLocations } from '../ScreeningDataDashboard/screeningDataDashboard.asyncActions'
import { selectLocations } from '../ScreeningDataDashboard/screeningDataDashboard.selectors'
import { selectCurrentUserHasPermissions } from '../../infrastructure/userContext'
import { selectWizardFormValues } from '../../widgets/Wizard/wizard.selectors'
import { actions as action } from '../../widgets/Wizard/wizard.slice'
import { actions } from '../VisitItem/visitItem.slice'

const { setSelectedVisitItemModal } = actions
const { setIsCurrentPageValid, resetFormValues } = action

const VisitDetailModal = () => {
  const wizardForm = useSelector(selectWizardFormValues)
  const dispatch = useDispatch()
  const visitDetails = useSelector(selectVisitDetails)
  const locations = useSelector(selectLocations)
  const currentUserHasPermissions = useSelector(selectCurrentUserHasPermissions)
  const isNurse = currentUserHasPermissions([USER_ROLES.NURSE])
  const {
    id,
    pharmacyAddress,
    // pharmacyAddress2,
    // pharmacyCity,
    // pharmacyLatitude,
    // pharmacyLongitude,
    // pharmacyName,
    // pharmacyState,
    // pharmacyZipcode,
    discharge,
    visitReason,
    additionalNotes,
    location,
  } = visitDetails

  const displayAddress = discharge
    ? discharge?.pharmacyAddress
    : pharmacyAddress

  const [notes, setNotes] = useState(additionalNotes)
  const [patientVisitReason, setPatientVisitReason] = useState(visitReason)
  const [patientLocation, setPatientLocation] = useState(location)

  const resetModal = () => {
    dispatch(setSelectedVisitItemModal(null))
    dispatch(setIsCurrentPageValid(false))
    dispatch(resetFormValues())
  }

  // TODO: Uncomment when pharmacy is brought back
  // const pharmacyFormValues = pharmacyCity
  // 	? {
  // 			address: {
  // 				streetNumber: pharmacyAddress,
  // 				streetName: pharmacyAddress2,
  // 				municipality: pharmacyCity,
  // 				countrySubdivision: pharmacyState,
  // 				postalCode: pharmacyZipcode,
  // 			},
  // 			poi: {
  // 				name: pharmacyName,
  // 			},
  // 			position: {
  // 				lat: pharmacyLatitude,
  // 				lon: pharmacyLongitude,
  // 			},
  // 	  }
  // 	: {}

  // useEffect(() => {
  // 	if (!isEmpty(pharmacyFormValues) && isEmpty(patientVisitDetails)) {
  // 		dispatch(setPatientVisitDetails(pharmacyFormValues))
  // 	}
  // })

  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])

  useEffect(() => {
    if (locations.length === 0) {
      dispatch(fetchLocations())
    }
  }, [dispatch, locations])

  const handleClose = () => {
    resetModal()
    dispatch(hideModal())
  }

  const handleSubmit = () => {
    const updatedVisit = {
      additionalNotes: notes || '',
      locationId: patientLocation.id,
      visitReason: patientVisitReason,
      pharmacyAddress: wizardForm?.pharmacyAddress,
      // patientVisitDetails?.address?.streetNumber) ??,
      // TODO: Uncomment when pharmacy is brought back
      // pharmacyName: patientVisitDetails?.poi?.name,
      // pharmacyAddress: patientVisitDetails?.address?.streetNumber,
      // pharmacyAddress2: patientVisitDetails?.address?.streetName,
      // pharmacyCity: patientVisitDetails?.address?.municipality,
      // pharmacyState: patientVisitDetails?.address?.countrySubdivision,
      // pharmacyZipcode: patientVisitDetails?.address?.postalCode,
      // pharmacyLatitude: Number(patientVisitDetails?.position?.lat || null),
      // pharmacyLongitude: Number(patientVisitDetails?.position?.lon || null),
    }
    const dischargedVisit = {
      pharmacyAddress: wizardForm?.pharmacyAddress,
      // patientVisitDetails?.address?.streetNumber,
    }

    dispatch(updateVisit({ visitId: id, updatedVisit })).then(() => {
      if (discharge) {
        dispatch(
          updateDischargeVisit({
            id: discharge?.id,
            dischargedVisit,
          })
        )
      }
    })
    handleClose()
  }

  const footer = (
    <ModalFooter
      submitButtonProps={{
        onClick: () => handleSubmit(),
      }}
      cancelButtonProps={{
        onClick: () => handleClose(),
      }}
    />
  )

  return (
    <Modal title='Visit Details' footer={footer} size='lg' reset={handleClose}>
      {/* PERMISSION:- Can Edit visit reason */}
      {isNurse && (
        <Form className='py-10'>
          <Form.Group controlId='visitLocation'>
            <Row>
              <Col md={4}>
                <Form.Label className='f-14 hind font-weight-bold my-2'>
                  Visit Location
                </Form.Label>
              </Col>
              <Col md={8}>
                <CustomSelectInput
                  placeholder='All Locations'
                  options={locations}
                  onChange={(value) => setPatientLocation(value)}
                  value={patientLocation.name}
                  keyField='id'
                  fieldsToBeDisplayed={['name']}
                  showSearchBar={false}
                  isScheduleArchive={true}
                  readOnly={true}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId='reasonForVisit'>
            <Row>
              <Col md={4}>
                <Form.Label className='f-14 hind font-weight-bold my-2'>
                  Reason For Visit
                </Form.Label>
              </Col>
              <Col md={8}>
                <CustomSelectInput
                  placeholder='Select Reason for Visit'
                  options={[...mockVisitReasons, { reason: 'Other' }]}
                  onChange={(value) => setPatientVisitReason(value.reason)}
                  value={patientVisitReason}
                  showSearchBar={false}
                  fieldsToBeDisplayed={['reason']}
                  keyField='reason'
                  isScheduleArchive={true}
                  dataTestId='visit-reason'
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId='additionalVisitNotes'>
            <Row>
              <Col md={4}>
                <Form.Label className='f-14 hind font-weight-bold my-2'>
                  Additional Visit Notes
                </Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  as='textarea'
                  cols='30'
                  rows='6'
                  className='mb-20'
                  placeholder='Additional Notes...'
                  onChange={(ev) => setNotes(ev.target.value)}
                  value={notes}
                />
              </Col>
            </Row>
          </Form.Group>
          <hr />
        </Form>
      )}
      <h4 className='f-16 font-weight-bold lh-30'>Pharmacy</h4>
      <TemporaryPharmacy visitDetailsPharmacyAddress={displayAddress} />
    </Modal>
  )
}
export default VisitDetailModal
