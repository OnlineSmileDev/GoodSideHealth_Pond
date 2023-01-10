import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LABEL_POSITIONS } from 'constants/general'
import { isEmpty } from 'utils/isEmpty'
import { showModal } from '../../widgets/modal'
import DocumentResult from './DocumentResult'
import Signature from '../DischargeNoteModal/Signature'
import Wizard from '../../widgets/Wizard'
import { actions } from '../ScheduleArchive/scheduleArchive.slice'
import { selectSelectedPatient } from '../ScheduleArchive/scheduleArchive.selectors'
import { updateVisit } from '../VisitItem/visitItem.asyncActions'

const { setScheduleArchiveModal, saveSelectedPatient } = actions

const TestResultModal = () => {
  const dispatch = useDispatch()

  const resetModal = () => {
    dispatch(setScheduleArchiveModal(null))
    dispatch(saveSelectedPatient({}))
  }
  const selectedPatient = useSelector(selectSelectedPatient)

  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])

  const pages = [
    { label: 'Document Result', component: DocumentResult },
    { label: 'eSign', component: Signature },
  ]

  const onFinalize = (formValues, resetWizard) => {
    const { testResult, signature, signatureDateTime } = formValues
    const result = {
      visitMetadata: {
        ...selectedPatient.visitMetadata,
        testReport: testResult,
        testerSignature: signature,
        signatureDateTime: signatureDateTime,
      },
    }
    dispatch(
      updateVisit({ visitId: selectedPatient.id, updatedVisit: result })
    ).then((res) => {
      if (res.payload) {
        resetModal()
        resetWizard()
      }
    })
  }

  const getInitialFormValues = () => {
    if (!isEmpty(selectedPatient)) {
      const { testReport, testerSignature, signatureDateTime } =
        selectedPatient.visitMetadata
      return {
        testResult: testReport,
        signature: testerSignature,
        signatureDateTime,
      }
    } else {
      return {}
    }
  }

  return (
    <Wizard
      pages={pages}
      onFinalize={onFinalize}
      onCancel={resetModal}
      title='Test Result'
      finalButtonText='Complete'
      labelPosition={LABEL_POSITIONS.TOP}
      initialFormData={getInitialFormValues()}
    />
  )
}

export default TestResultModal
