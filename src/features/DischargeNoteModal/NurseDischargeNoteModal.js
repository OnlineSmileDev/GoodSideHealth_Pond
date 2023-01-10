import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LABEL_POSITIONS } from 'constants/general'
import { showModal } from '../../widgets/modal'
import AddSummary from './AddSummary'
import Signature from './Signature'
import Wizard from '../../widgets/Wizard'
import { selectVisitDetails } from '../VisitItem/visitItem.selectors'
import {
  updateDischargeVisit,
  createDischargeVisit,
  fetchVisitDetails,
} from '../VisitItem/visitItem.asyncActions'
import { actions } from '../VisitItem/visitItem.slice'

const { setSelectedDischargeNoteModal } = actions

const NurseDischargeNoteModal = ({ onClose }) => {
  const dispatch = useDispatch()
  const visitDetails = useSelector(selectVisitDetails)
  const resetModal = () => dispatch(setSelectedDischargeNoteModal(null))

  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])

  const pages = [
    { label: 'Visit Summary', component: AddSummary },
    { label: 'eSignature', component: Signature },
  ]

  const onFinalize = (formValues, resetWizard) => {
    // TODO: It might be better to handle this in getInitialFormValues but as a hotfix for now
    const dischargedVisit = {
      visitId: visitDetails.id,
      ...formValues,
      facilitatorVisitSummary: formValues?.facilitatorVisitSummary ?? '',
    }
    dispatch(
      !visitDetails.discharge
        ? createDischargeVisit({ dischargedVisit })
        : updateDischargeVisit({
            id: visitDetails?.discharge?.id,
            dischargedVisit,
          })
    ).then(() => {
      dispatch(fetchVisitDetails({ visitId: visitDetails.id }))
      resetWizard()
      resetModal()
    })
  }
  const getInitialFormValues = () => {
    // TODO- Add Other as well, not sure we would need signature and dateofsignature
    if (visitDetails.discharge) {
      const {
        facilitatorVisitSummary,
        facilitatorSignature,
        facilitatorSignatureDateTime,
      } = visitDetails.discharge
      return {
        facilitatorVisitSummary,
        facilitatorSignature,
        facilitatorSignatureDateTime,
      }
    } else return {}
  }

  return (
    <Wizard
      pages={pages}
      onFinalize={onFinalize}
      onCancel={resetModal}
      title='Discharge Note'
      finalButtonText='Complete'
      labelPosition={LABEL_POSITIONS.TOP}
      initialFormData={getInitialFormValues()}
      utilityClass={
        'pendo-discharge-modal-submit-button-nurse e2e-discharge-modal-submit-button-nurse'
      }
    />
  )
}
export default NurseDischargeNoteModal
