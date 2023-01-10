import React from 'react'
import OrderModal from '../OrderModal'
import RemoveOrderModal from './RemoveOrderModal'
import { MIDDLE_PANEL_MODAL } from './middlePanelModal.constants'
import DocumentAdministrationModal from './DocumentAdministrationModal'
import AssessmentOrderModal from './AssessmentOrderModal'
import PHQModal from './PHQModal'
import PHQCompletionModal from './PHQModal/PHQCompletionModal'
import PHQResultsModal from './PHQModal/PHQResultsModal'

const getMiddlePanelModal = (modalName) => {
  switch (modalName) {
    case MIDDLE_PANEL_MODAL.ORDER_MODAL:
      return <OrderModal />
    case MIDDLE_PANEL_MODAL.REMOVE_ORDER_MODAL:
      return <RemoveOrderModal />
    case MIDDLE_PANEL_MODAL.DOCUMENT_ADMINISTRATION_MODAL:
      return <DocumentAdministrationModal />
    case MIDDLE_PANEL_MODAL.ASSESSMENT_ORDER_MODAL:
      return <AssessmentOrderModal />
    case MIDDLE_PANEL_MODAL.PHQ_ASSESSMENT:
      return <PHQModal />
    case MIDDLE_PANEL_MODAL.COMPLETED_PHQ_ASSESSMENT:
      return <PHQCompletionModal />
    case MIDDLE_PANEL_MODAL.PHQ_ASSESSMENT_RESULTS:
      return <PHQResultsModal />
    default:
      return null
  }
}

export default getMiddlePanelModal
