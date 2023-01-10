import React from 'react'
import NurseDischargeNoteModal from './NurseDischargeNoteModal'
import ProviderDischargeNote from './ProviderDischargeNoteModal'
import { DISCHARGE_NOTE_MODAL } from './dischargeNoteModal.constants'

const getDischargeNoteModal = (modalName) => {
  switch (modalName) {
    case DISCHARGE_NOTE_MODAL.NURSE:
      return <NurseDischargeNoteModal />
    case DISCHARGE_NOTE_MODAL.PROVIDER:
      return <ProviderDischargeNote />

    default:
      return null
  }
}

export default getDischargeNoteModal
