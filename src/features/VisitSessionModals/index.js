import React from 'react'
import EndSessionModal from './EndSessionModal'
import ReleaseSessionModal from './ReleaseSessionModal'
import { VISIT_SESSION_MODALS } from './visitSessionModals.constants'

const getVisitSessionModal = (modalName) => {
  switch (modalName) {
    case VISIT_SESSION_MODALS.END_SESSION_MODAL:
      return <EndSessionModal />
    case VISIT_SESSION_MODALS.RELEASE_SESSION_MODAL:
      return <ReleaseSessionModal />
    default:
      return null
  }
}

export default getVisitSessionModal
