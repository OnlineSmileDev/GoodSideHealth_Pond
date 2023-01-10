import React from 'react'
import PatientDetailsModal from './PatientDetailsModal'
import VisitActivityModal from './VisitActivityModal'
import VitalSignsModal from './VitalSignsModal'
import EndVisitModal from './EndVisitModal'
import ReleaseVisitModal from './ReleaseVisitModal'
import CancelVisitModal from './CancelVisitModal'
import VisitDetailModal from './VisitDetailModal'
import ScheduleEndingVisitModal from './ScheduleEndingVisitModal'
import ShareVideoLinkModal from './ShareVideoLinkModal'
import { VISIT_ITEM_MODALS } from './visitItemModal.constants'
import DeleteVideoInvitationModal from './DeleteVideoInvitationModal'
import ResendVideoInvitationModal from './ResendVideoInvitationModal'

const getVisitItemModal = (modalName) => {
  switch (modalName) {
    case VISIT_ITEM_MODALS.PATIENT_DETAILS:
      return <PatientDetailsModal />
    case VISIT_ITEM_MODALS.VISIT_DETAILS:
      return <VisitDetailModal />
    case VISIT_ITEM_MODALS.VISIT_ACTIVITY:
      return <VisitActivityModal />
    case VISIT_ITEM_MODALS.PATIENT_VITAL_SIGNS:
      return <VitalSignsModal />
    case VISIT_ITEM_MODALS.SHARE_VIDEO_LINK:
      return <ShareVideoLinkModal />
    case VISIT_ITEM_MODALS.DELETE_VIDEO_INVITATION:
      return <DeleteVideoInvitationModal />
    case VISIT_ITEM_MODALS.RESEND_VIDEO_INVITATION:
      return <ResendVideoInvitationModal />
    case VISIT_ITEM_MODALS.END_VISIT:
      return <EndVisitModal />
    case VISIT_ITEM_MODALS.RELEASE_VISIT:
      return <ReleaseVisitModal />
    case VISIT_ITEM_MODALS.CANCEL_VISIT:
      return <CancelVisitModal />
    case VISIT_ITEM_MODALS.SCHEDULE_ENDING_VISIT:
      return <ScheduleEndingVisitModal />
    default:
      return null
  }
}

export default getVisitItemModal
