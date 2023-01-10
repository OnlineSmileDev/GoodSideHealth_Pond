import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { LABEL_POSITIONS } from 'constants/general'
import { VISITS_STATUS } from 'constants/visits'
import { formatDateForApi } from 'utils/datePicker'
import { showModal } from '../../widgets/modal'
import SelectLocation from './SelectLocation'
import SelectPatient from './SelectPatient'
import SelectLanguage from './SelectLanguage'
import Details from './Details'
import Wizard from '../../widgets/Wizard'
import { saveVisit } from '../VisitItem/visitItem.asyncActions'
import { actions } from '../VisitItem/visitItem.slice'

const { resetRequestVisitForm } = actions

const LOCATION = 0
const LANGUAGE = 2

const RequestVisitModal = ({ onClose, initialFormValues }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const initialStep = initialFormValues ? LANGUAGE : LOCATION

  const resetModal = () => {
    dispatch(resetRequestVisitForm())
    onClose()
  }

  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])

  const pages = [
    { label: 'Location', component: SelectLocation },
    { label: 'Patient', component: SelectPatient },
    { label: 'Language', component: SelectLanguage },
    { label: 'Details', component: Details },
  ]

  const onFinalize = (formValues, resetWizard) => {
    const { patient, location, visitReason, language, notes } = formValues
    const {
      allergies,
      medications,
      conditions,
      lastName,
      id,
      firstName,
      dateOfBirth,
      studentId,
      birthSex,
    } = patient
    const formattedDateOfBirth = formatDateForApi(dateOfBirth)

    const visit = {
      status: VISITS_STATUS.WAITING,
      patientId: id,
      locationId: +location.id,
      organizationId: +location.organizationId,
      visitReason,
      language,
      additionalNotes: notes,
      allergies,
      medications,
      conditions,
      lastName,
      firstName,
      studentId,
      dateOfBirth: formattedDateOfBirth,
      birthSex,
    }
    dispatch(saveVisit({ visit })).then((res) => {
      if (res.payload) router.push(`/visit/${res.payload.id}`)
      resetModal()
      resetWizard()
    })
  }

  return (
    <Wizard
      pages={pages}
      onFinalize={onFinalize}
      onCancel={resetModal}
      title='Request Visit'
      finalButtonText='Start Visit ASAP'
      labelPosition={LABEL_POSITIONS.TOP}
      utilityClass={'pendo-request-visit-submit-button'}
      initialFormData={initialFormValues}
      initialStep={initialStep}
    />
  )
}

export default RequestVisitModal
