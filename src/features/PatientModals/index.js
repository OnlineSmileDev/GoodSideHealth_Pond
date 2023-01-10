import React from 'react'
import ShareRegistrationLinkModal from './ShareRegistrationLinkModal'
import { PATIENT_MODALS } from './patientModals.constants'

const getPatientModal = (modalName) => {
  switch (modalName) {
    case PATIENT_MODALS.SHARE_REGISTRATION_LINK:
      return <ShareRegistrationLinkModal />
    default:
      return null
  }
}

export default getPatientModal
