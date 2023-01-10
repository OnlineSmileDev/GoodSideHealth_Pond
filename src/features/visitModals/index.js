import React from 'react'
import ClaimVisitRequestModal from './ClaimVisitRequestModal'
import ClaimedVisitAlertModal from './ClaimedVisitAlertModal'
import { VISIT_MODALS } from './visitModals.constants'

const getVisitModal = (modalName) => {
  switch (modalName) {
    case VISIT_MODALS.CLAIM_VISIT_REQUEST:
      return <ClaimVisitRequestModal />
    case VISIT_MODALS.CLAIMED_VISIT_ALERT:
      return <ClaimedVisitAlertModal />
    default:
      return null
  }
}

export default getVisitModal
